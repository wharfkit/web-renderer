<script lang="ts">
    export let title: string
    export let details: string
</script>

<div>
    <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M29.2151 4.79747C30.1528 3.85979 31.4246 3.33301 32.7507 3.33301H67.2506C68.5767 3.33301 69.8485 3.85979 70.7862 4.79747L95.2029 29.2141C96.1405 30.1518 96.6673 31.4236 96.6673 32.7497V67.2497C96.6673 68.5758 96.1405 69.8475 95.2029 70.7852L70.7862 95.2019C69.8485 96.1396 68.5767 96.6663 67.2506 96.6663H32.7507C31.4246 96.6663 30.1528 96.1396 29.2151 95.2019L4.79845 70.7852C3.86077 69.8475 3.33398 68.5758 3.33398 67.2497V32.7497C3.33398 31.4236 3.86077 30.1518 4.79845 29.2141L29.2151 4.79747ZM34.8217 13.333L13.334 34.8207V65.1786L34.8217 86.6663H65.1796L86.6673 65.1786V34.8207L65.1796 13.333H34.8217Z"
            fill="#FF5454"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M66.0355 33.9645C67.9882 35.9171 67.9882 39.0829 66.0355 41.0355L41.0355 66.0355C39.0829 67.9882 35.9171 67.9882 33.9645 66.0355C32.0118 64.0829 32.0118 60.9171 33.9645 58.9645L58.9645 33.9645C60.9171 32.0118 64.0829 32.0118 66.0355 33.9645Z"
            fill="#FF5454"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M33.9645 33.9645C35.9171 32.0118 39.0829 32.0118 41.0355 33.9645L66.0355 58.9645C67.9882 60.9171 67.9882 64.0829 66.0355 66.0355C64.0829 67.9882 60.9171 67.9882 58.9645 66.0355L33.9645 41.0355C32.0118 39.0829 32.0118 35.9171 33.9645 33.9645Z"
            fill="#FF5454"
        />
    </svg>
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
        color: var(--on-surface-color);
        margin-block: var(--space-s);
    }

    h2 {
        color: var(--on-surface-color);
        font-size: var(--fs-3);
        font-weight: 600;
        margin: 0;
    }

    p {
        color: var(--on-surface-color);
        font-size: var(--fs-1);
        font-weight: 400;
        margin: 0;
        max-width: var(--measure);
    }
</style>
