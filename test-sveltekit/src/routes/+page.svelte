<script>
let count = 0;
function increment() {
    console.log('Clicked!');
    count += 1;
}
</script>

<button on:click={increment}>Count is {count}</button>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
