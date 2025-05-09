<script lang="ts">

    export let voteRatio: number = 0.5;
    export let size: number = 300;
    /*
     * DountColor = 'Black' -> show black dount
     * DountColor = 'Red' -> show red dount
     * DountColor = 'Ratio' -> show ratio dount
     */

    $: cx = size / 2;
    $: cy = size / 2;

    function generateArcPath(ratio: number): string {
        if (ratio <= 0) return '';
        if (ratio >= 1) {
          return `M 0 0 H ${size} V ${size} H 0 Z`;
        }

        const angle = ratio * 360;
        const { x, y, side } = findBorderIntersection(cx, cy, angle, size);

        let path = `M ${cx} ${cy} L ${cx} 0 `;
        
        if (side === 'right' || side === 'bottom' || side === 'left' || side == 'ltop') {
        path += `L ${size} 0 `;
        }
        if (side === 'bottom' || side === 'left' || side == 'ltop') {
        path += `L ${size} ${size} `;
        }
        if (side === 'left' || side == 'ltop') {
        path += `L 0 ${size} `;
        }
        if (side == 'ltop') {
        path += `L 0 0 `;
        }

        path += `L ${x} ${y} Z`;
        return path;
    }

    function findBorderIntersection(cx: number, cy: number, angle: number, size: number): { x: number, y: number, side: 'right' | 'bottom' | 'left' | 'rtop' | 'ltop' } {
        const rad = (angle - 90) * Math.PI / 180;
        const dx = Math.cos(rad);
        const dy = Math.sin(rad);

        const left = 0, right = size, top = 0, bottom = size;

        if (angle < 45) {
        const t = (top - cy) / dy;
        return { x: cx + t * dx, y: top, side: 'rtop' };
        } else if (angle >= 45 && angle < 135) {
        const t = (right - cx) / dx;
        return { x: right, y: cy + t * dy, side: 'right' };
        } else if (angle >= 135 && angle < 225) {
        const t = (bottom - cy) / dy;
        return { x: cx + t * dx, y: bottom, side: 'bottom' };
        } else if (angle >= 225 && angle < 315) {
        const t = (left - cx) / dx;
        return { x: left, y: cy + t * dy, side: 'left' };
        } else {
        const t = (top - cy) / dy;
        return { x: cx + t * dx, y: top, side: 'ltop' };
        }
    }

</script>

<div style="overflow: visible;">
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    <defs>
      <clipPath id="voteClip">
        <path d={generateArcPath(voteRatio)} />
      </clipPath>
    </defs>

    <image href="/red_donut_square.png" x="0" y="0" width={size} height={size} />
    <image
      href="/black_donut_square.png"
      x="0"
      y="0"
      width={size}
      height={size}
      clip-path="url(#voteClip)"
    />
  </svg>
</div>