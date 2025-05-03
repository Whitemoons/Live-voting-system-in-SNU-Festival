<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import DonutVote from './lib/DonutVote.svelte'
  import Donut from './lib/Donut.svelte'
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

  onMount(() => {
    startStatePolling();
  })

  onDestroy(() => {
    stopStatePolling();
  })
</script>

<main>
  <div class="grid">
    <div class="cell">1,1</div>
    <div class="cell">1,2</div>
    <div class="cell">1,3</div>
    <div class="cell">
      <div class="flex">
        <div>{showGroupName() ? group1 : ''}</div>
        {#if showVoteDount() == 0}
          <Donut dountColor = {0} size={300} />
        {:else if showVoteDount() == 1}
          <DonutVote {voteRatio} size={300} />
        {:else}
          <div></div>
        {/if}
      </div>
    </div>
    <div class="cell">
      <div>
        <div>
          {#if showTitle() == 0}
            <div>스트릿 댄스 파이터</div>
          {:else if showTitle() == 1}
            <div>{group1}</div>
          {:else if showTitle() == 2}
            <div>{group2}</div>
          {:else if showTitle() == 3}
            <div>QR</div>
          {:else}
            <div>Winner!</div>
          {/if}
        </div>
        <div>{$state}</div>
        <input type="range" min="0" max="1" step="0.01" bind:value={voteRatio} />
      </div>
    </div>
    <div class="cell">
      <div class="flex">
        <div>{showGroupName() ? group2 : ''}</div>
        {#if showVoteDount() == 0}
            <Donut dountColor = {1} size={300} />
        {:else if showVoteDount() == 1}
          <DonutVote {voteRatio} size={300} />
        {:else}
          <div></div>
        {/if}
      </div>
    </div>
    <div class="cell">3,1</div>
    <div class="cell">3,2</div>
    <div class="cell">3,3</div>
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
    grid-template-rows: 1fr 6fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100vh;
    width: 100vw;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .cell {
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
