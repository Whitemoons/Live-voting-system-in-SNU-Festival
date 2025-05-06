<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import DonutVote from './lib/DonutVote.svelte'
  import ShowGroupLogo from './lib/ShowGroupLogo.svelte'
  import InitialGroupLogo from './lib/InitialGroupLogo.svelte';
  import ShowQr from './lib/ShowQR.svelte';

  import { startStatePolling, stopStatePolling } from './lib/polling';
  import { state } from './lib/voteStore';

  let voteRatio = 0.5;
  
  const group1 = import.meta.env.VITE_GROUP_1;
  const group2 = import.meta.env.VITE_GROUP_2;

  function showGroupName(): boolean {
    if ($state == 0) return true;
    else return false;
  }

  function showVoteDount(): number {
    if ($state == 0 || $state == 3 || $state == 4) return 0;
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

  onMount(() => {
    startStatePolling();
  })

  onDestroy(() => {
    stopStatePolling();
  })
</script>

<main>
  <div class="grid">
    <div class="sub-grid">
      <div class="upper-cell">
        <InitialGroupLogo groupNumber={0} visible={showGroupName()} size={130}/>
      </div>
      {#if showVoteDount() == 0 || showVoteDount() == 1}
      <DonutVote {voteRatio} size={370} DountColor={showVoteDount() * 2}/>
      {:else}
      <div></div>
      {/if}
      <div class="lower-cell">
        <ShowQr QRNumber={0} visible={showLiveQR()} size={140}/>
      </div>
    </div>
    <div class="cell">
      <div>
        <div>
          {#if showTitle() == 0}
            <div class="title">스트릿 댄스<br/> 파이터</div>
          {:else if showTitle() == 1 || showTitle() == 2}
            <ShowGroupLogo groupNumber={showTitle()} />
          {:else if showTitle() == 3}
            <ShowQr QRNumber={1} visible={showFinalQR()} size={200}/>
          {:else}
            <div>Winner!</div>
          {/if}
        </div>
      </div>
    </div>
    <div class="sub-grid">
      <div class="upper-cell">
        <InitialGroupLogo groupNumber={1} visible={showGroupName()} size={130}/>
      </div>
      {#if showVoteDount() == 0 || showVoteDount() == 1}
        <DonutVote {voteRatio} size={370} DountColor={showVoteDount() + 1}/>
      {:else}
        <div></div>
      {/if}
      <div class="lower-cell">
        <ShowQr QRNumber={0} visible={showLiveQR()} size={140}/>
      </div>
    </div>
  </div>
</main>

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
</style>
