<script lang="ts">
    export let dountColor: number = 0;
    export let size: number = 300;
</script>

<div style="overflow: visible;">
  <svg width={size} height={size} viewBox={`-10 -10 ${size + 20} ${size + 20}`}>
    <image href={ dountColor == 0 ? "/red_donut_square.png" : "/black_donut_square.png"} x="0" y="0" width={size} height={size} />
  </svg>
</div>