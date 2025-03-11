<script>
import Button from '$lib/components/ui/button.svelte';
import Input from '$lib/components/ui/input.svelte';

console.log('TOP-LEVEL SCRIPT: This should appear in the browser console!');

let newMessage = '';
let messages = [];

async function fetchMessages() {
  console.log('Fetching messages...');
  try {
    const res = await fetch('http://localhost:3000/messages');
    if (res.ok) {
      messages = await res.json();
      console.log('Messages:', messages);
    } else {
      console.error('Failed to fetch messages', res.status);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

async function sendMessage() {
  if (!newMessage.trim()) return;
  console.log('Sending message:', newMessage);
  try {
    const res = await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newMessage }),
    });
    if (res.ok) {
      newMessage = '';
      fetchMessages();
    } else {
      console.error('Failed to send message', res.status);
    }
  } catch (error) {
    console.error('Send error:', error);
  }
}
</script>

<h1>Message Logger</h1>
<div style="display: flex; gap: 0.5rem; align-items: center;">
  <Input bind:value={newMessage} placeholder="Enter your message" />
  <Button on:click={sendMessage}>Send</Button>
  <Button on:click={fetchMessages}>Display</Button>
</div>

{#if messages.length}
  <ul>
    {#each messages as message}
      <li>
        <strong>{new Date(message.createdAt).toLocaleString()}:</strong> {message.text}
      </li>
    {/each}
  </ul>
{:else}
  <p>No messages to display.</p>
{/if}
