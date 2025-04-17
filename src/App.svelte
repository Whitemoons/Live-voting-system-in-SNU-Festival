<script lang="ts">
  import DonutVote from './lib/DonutVote.svelte'
  let voteRatio = 0.5;
</script>

<main>
  <DonutVote {voteRatio} size={300} />

  <div>
    <div>스트리트 댄스 파이터</div>
    <input type="range" min="0" max="1" step="0.01" bind:value={voteRatio} />
  </div>


  <DonutVote {voteRatio} size={300} />
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
</style>
