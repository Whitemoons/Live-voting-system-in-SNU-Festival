<script lang="ts">
  import { onMount } from 'svelte';
  import { Spring } from 'svelte/motion';

  import DonutVote from './lib/DonutVote.svelte'
  import ShowGroupLogo from './lib/ShowGroupLogo.svelte'
  import InitialGroupLogo from './lib/InitialGroupLogo.svelte';
  import ShowQr from './lib/ShowQR.svelte';

  import { startFinalPolling, startLivePolling, startStatePolling, stopFinalPolling, stopLivePolling, stopStatePolling } from './lib/polling';
  import { state, liveVote, finalVote } from './lib/voteStore';

  let voteRatio = 0.5;

  let containerRef: HTMLDivElement;
  let dynamicSize = 370; // fallback default

  const springRatioLeft = new Spring(0, { stiffness: 0.07, damping: 0.8 });
  const springRatioRight = new Spring(1, { stiffness: 0.07, damping: 0.8 });

  let result_1: number = 0;
  let result_2: number = 0;

  let prevLivePolling = false;
  let prevFinalPolling = false;

  function showGroupName(): boolean {
    if ($state == 0 || $state == 3 || $state == 4) return true;
    else return false;
  }

  function showVoteDount(): number {
    if ($state == 0 || $state == 3 || $state == 4 || $state == 6) return 0;
    else if ($state == 1 || $state == 2) return 1;
    else return 2;
  }

  function showTitle(): number {
    if ($state == 0) return 0;
    else if ($state == 1 || $state == 3) return 1;
    else if ($state == 2 || $state == 4) return 2;
    else if ($state == 5) return 3;
    else return 4;
  }

  function showLiveQR(): boolean {
    if (1 <= $state  && $state <= 4) return true;
    else return false;
  }

  function showFinalQR(): boolean {
    if ($state == 5) return true;
    else return false;
  }

  let resizeObserver: ResizeObserver;

  onMount(() => {
    if (typeof window !== 'undefined' && containerRef) {
      resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const rect = entry.contentRect;
          const newSize = rect.width / 3;
          if (Math.abs(dynamicSize - newSize) > 1) {
            dynamicSize = newSize;
          }
        }
      });
      resizeObserver.observe(containerRef);
    }

    startStatePolling();

    return () => {
      stopStatePolling();
      if (resizeObserver && containerRef) resizeObserver.unobserve(containerRef);
    };
  });

  $: {
    const s = $state;
    const val = $liveVote;
    const a = Number(val['혼또니'] ?? 0);
    const b = Number(val['히스'] ?? 0);

    const newRatio = (a === 0 && b === 0)
      ? 0.5
      : a / (a + b);

    if (voteRatio !== newRatio) voteRatio = newRatio;

    const mode = showVoteDount();
    if (mode === 1) {
      springRatioLeft.set(voteRatio);
      springRatioRight.set(voteRatio);
      console.log(mode, springRatioLeft.current);
    } else {
      springRatioLeft.set(0);
      springRatioRight.set(1);
    }
  }
  $: {
    const s = $state;
    const mode = showVoteDount();

    const liveActive = (mode == 1);
    if (liveActive !== prevLivePolling) {
      prevLivePolling = liveActive;
      if (liveActive) startLivePolling();
      else stopLivePolling();
    }

    // Final polling
    const finalActive = (mode == 2);
    if (finalActive !== prevFinalPolling) {
      prevFinalPolling = finalActive;
      if (finalActive) startFinalPolling();
      else stopFinalPolling();
    }
  }
  $: {
    const val = $liveVote;
    const l_1 = Number(val['혼또니'] ?? 0);
    const l_2 = Number(val['히스'] ?? 0);
    
    const final = $finalVote;
    const f_1 = Number(final['혼또니'] ?? 0);
    const f_2 = Number(final['히스'] ?? 0);

    result_1 = l_1 * 0.3 + f_1 * 0.7;
    result_2 = l_2 * 0.3 + f_2 * 0.7;

    //console.log(result_1, result_2);
  }
</script>

<div bind:this={containerRef}>
  <main>
    <div class="grid">
      <div class="sub-grid">
        <div class="upper-cell">
          <InitialGroupLogo groupNumber={1} visible={showGroupName()} size={130}/>
        </div>
        {#if showVoteDount() == 0 || showVoteDount() == 1}
        <div class="glow">
          <DonutVote voteRatio={springRatioLeft.current} size={dynamicSize*0.8}/>
        </div>
        {:else}
        <div></div>
        {/if}
        <div class="lower-cell">
          <ShowQr QRNumber={0} visible={showLiveQR()} size={dynamicSize*0.3}/>
        </div>
      </div>
      <div class="sub-grid">
        <div class="upper-cell">
        </div>
        <div class="cell">
          {#if showTitle() == 0}
            <div class="glow title">스댄파<br/><div style="font-size:35px">SNU Dance Fighter</div></div>
          {:else if showTitle() == 1 || showTitle() == 2}
            <div class="glow"><ShowGroupLogo groupNumber={showTitle()} size={dynamicSize * 0.7}/></div>
          {:else if showTitle() == 3}
            <ShowQr QRNumber={1} visible={showFinalQR()} size={dynamicSize * 0.5}/>
          {:else}
            {#if result_1 > result_2}
              <InitialGroupLogo groupNumber={0} visible={true} size={dynamicSize * 0.7}/>
            {:else if result_2 > result_1}
              <InitialGroupLogo groupNumber={1} visible={true} size={dynamicSize * 0.7}/>
            {:else}
              <div>Tie!</div>
            {/if}
          {/if}
        </div>
      </div>
      <div class="sub-grid">
        <div class="upper-cell">
          <InitialGroupLogo groupNumber={0} visible={showGroupName()} size={130}/>
        </div>
        {#if showVoteDount() == 0 || showVoteDount() == 1}
          <div class="glow">
            <DonutVote voteRatio={springRatioRight.current} size={dynamicSize*0.8}/>
          </div>
        {:else}
          <div></div>
        {/if}
        <div class="lower-cell">
          <ShowQr QRNumber={0} visible={showLiveQR()} size={dynamicSize*0.3}/>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  @font-face {
    font-family: 'JalnanGothic';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    font-family: 'JalnanGothic', sans-serif;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100vh;
    width: 100vw;
  }

  .sub-grid {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    height: 100vh;
    width: 100%;
  }

  .title {
    font-size: 3em;
  }

  .upper-cell {
    display: flex;
    justify-content: center;
    align-items: end;
  }

  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .lower-cell {
    display: flex;
    justify-content: center;
    align-items: start;
  }

  .glow {
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
  }
</style>
