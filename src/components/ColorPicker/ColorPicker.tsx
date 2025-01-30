import { useEffect, useState } from "react";

const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0,
    s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else {
      h = (r - g) / d + 4;
    }
    h /= 6;
  }

  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(
    1
  )}%`;
};

const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  // Convert RGB to hex
  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export default function ColorPicker({ cKey }: { cKey: string }) {
  const [color, setColor] = useState("");

  useEffect(() => {
    const colorValue = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(`--${cKey}`)
      .trim();

    if (colorValue) {
      const [h, s, l] = colorValue.match(/\d+(\.\d+)?/g)?.map(Number) ?? [
        0, 0, 0,
      ];

      const hexColor = hslToHex(h, s, l);
      setColor(hexColor);
    } else {
      setColor("#000000");
    }
    console.log("흠:", colorValue);
  }, [cKey]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColor(newColor);

    const [r, g, b] = hexToRgb(newColor);
    const hsl = rgbToHsl(r, g, b);
    document.documentElement.style.setProperty(`--${cKey}`, `${hsl}`);
  };

  return (
    <div className="p-4">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {cKey} Color:
      </label>
      <input
        type="color"
        value={color}
        onChange={handleChange}
        className="w-9 h-10 cursor-pointer bg-white border-none"
      />

      {/* <div className={`mt-4 p-4 text-white bg-${cKey} rounded-md`}>
        {cKey} 색상이 적용된 박스
      </div> */}
    </div>
  );
}
