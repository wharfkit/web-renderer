<script lang="ts">
    import Message from './Message.svelte'
    export let title: string
    export let details: string
</script>

<Message {title} {details} icon="alert" />
