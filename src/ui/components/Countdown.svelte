<script>
    import {onMount, onDestroy} from 'svelte'

    export let data = ''
    let deadline
    let remaining
    let timer

    $: {
        if (timer) {
            clearInterval(timer)
        }

        deadline = new Date(data)
        timer = setInterval(() => {
            remaining = deadline - Date.now()

            if (remaining <= 0) {
                clearInterval(timer)
            }
        }, 200)
    }

    onDestroy(() => {
        if (timer) {
            clearInterval(timer)
        }
    })

    function countdownFormat(date) {
        const timeLeft = date.getTime() - Date.now()
        if (timeLeft > 0) {
            return new Date(timeLeft).toISOString().substr(14, 5)
        }
        return '00:00'
    }
</script>

{#if deadline}
    {#key remaining}
        {countdownFormat(deadline)}
    {/key}
{/if}
