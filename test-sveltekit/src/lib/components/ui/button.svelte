<script>
  export let type = "button";
  export let onClick;
</script>

<button type={type} on:click={onClick} class="px-4 py-2 bg-blue-500 text-white rounded">
  <slot />
</button>
