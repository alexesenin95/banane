#!/usr/bin/env python3
"""Авто-нарезка спрайт-листа на отдельные фигуры по прозрачным промежуткам.

Фигуры на листе идут в ряд, разделённые вертикальными полосами полной
прозрачности. Скрипт находит каждую фигуру, обрезает по плотной рамке
(bounding box) и сохраняет отдельным PNG/WebP с альфа-каналом.

Примеры:
  # просто посмотреть, что найдётся (ничего не пишет):
  python3 tools/slice_sheet.py sheet.png --dry

  # нарезать в assets/sprites/h2_0.webp, h2_1.webp, ...:
  python3 tools/slice_sheet.py sheet.png assets/sprites/h2_

  # дать кадрам осмысленные имена (по порядку слева направо):
  python3 tools/slice_sheet.py sheet.png assets/sprites/ \
      --names h2_idle h2_run1 h2_run2 h2_run3 h2_ready h2_jump \
              h2_crouch h2_punch h2_club h2_throw
"""
import sys, argparse
from PIL import Image


def column_filled(alpha, x, h, thresh):
    for y in range(h):
        if alpha[x, y] > thresh:
            return True
    return False


def find_runs(im, alpha_thresh, min_gap):
    """Вернуть список (x0, x1) непрозрачных колонок-фигур."""
    w, h = im.size
    px = im.load()
    filled = [column_filled(px, x, h, alpha_thresh) for x in range(w)]
    runs, start, gap = [], None, 0
    for x in range(w):
        if filled[x]:
            if start is None:
                start = x
            gap = 0
        else:
            if start is not None:
                gap += 1
                if gap >= min_gap:
                    runs.append((start, x - gap + 1))
                    start = None
    if start is not None:
        runs.append((start, w))
    return runs


def bbox_of(im, x0, x1, alpha_thresh):
    """Плотная рамка фигуры внутри колонок [x0, x1)."""
    crop = im.crop((x0, 0, x1, im.size[1]))
    # alpha-маска -> getbbox по непрозрачным пикселям
    a = crop.split()[3].point(lambda v: 255 if v > alpha_thresh else 0)
    bb = a.getbbox()
    if bb is None:
        return None
    return (x0 + bb[0], bb[1], x0 + bb[2], bb[3])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("out_prefix", nargs="?", default="frame_",
                    help="префикс пути для кадров, напр. assets/sprites/h2_")
    ap.add_argument("--names", nargs="*", default=None,
                    help="имена кадров по порядку (без расширения)")
    ap.add_argument("--min-gap", type=int, default=12,
                    help="мин. ширина прозрачного промежутка между фигурами, px")
    ap.add_argument("--alpha", type=int, default=8, help="порог альфы (0-255)")
    ap.add_argument("--pad", type=int, default=2, help="отступ вокруг кадра, px")
    ap.add_argument("--ext", default="webp", choices=["webp", "png"])
    ap.add_argument("--dry", action="store_true", help="только показать, не писать")
    args = ap.parse_args()

    im = Image.open(args.input).convert("RGBA")
    runs = find_runs(im, args.alpha, args.min_gap)
    print(f"Лист {args.input} {im.size} -> найдено фигур: {len(runs)}")

    boxes = []
    for x0, x1 in runs:
        bb = bbox_of(im, x0, x1, args.alpha)
        if bb:
            boxes.append(bb)

    pad = args.pad
    for i, (l, t, r, b) in enumerate(boxes):
        l = max(0, l - pad); t = max(0, t - pad)
        r = min(im.size[0], r + pad); b = min(im.size[1], b + pad)
        name = (args.names[i] if args.names and i < len(args.names)
                else f"{i}")
        path = f"{args.out_prefix}{name}.{args.ext}"
        size = (r - l, b - t)
        print(f"  [{i}] {size[0]}x{size[1]} -> {path}")
        if not args.dry:
            frame = im.crop((l, t, r, b))
            frame.save(path, lossless=True) if args.ext == "webp" else frame.save(path)
    if args.dry:
        print("(dry-run: файлы не записаны)")


if __name__ == "__main__":
    main()
