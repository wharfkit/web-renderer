<script lang="ts">
    export let title: string
    export let details: string
</script>

<div>
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><polygon
            points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
        /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg
    >
    <h2>{title}</h2>
    <p>{details}</p>
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-s);
        text-align: center;
        color: var(--body-text-color);
        margin-block: var(--space-s);
    }

    svg {
        --size: var(--space-3xl);
        width: var(--size);
        height: var(--size);
        stroke: var(--color-error-2);
    }

    h2 {
        color: var(--body-text-color);
        font-size: var(--fs-3);
        font-weight: 600;
        margin: 0;
    }

    p {
        color: var(--body-text-color);
        font-size: var(--fs-1);
        font-weight: 400;
        margin: 0;
        max-width: var(--measure);
    }
</style>
