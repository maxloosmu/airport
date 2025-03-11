<script lang="ts">
  export let type: string = "text";
  export let placeholder: string = "";
  export let value: string = "";
</script>

<input
  type={type}
  placeholder={placeholder}
  bind:value
  class="px-4 py-2 border border-gray-300 rounded"
/>
