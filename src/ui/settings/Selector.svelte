<script lang="ts">
    import List from '../components/List.svelte'
    import ListItem from '../components/ListItem.svelte'
    import ListOption from '../components/ListOption.svelte'
    import type {SelectorOptions} from 'src/types'
    import {settings} from '../state'

    export let setting: string
    export let options: SelectorOptions<any>[]

    // Allows for custom onChange handlers
    export let onChange: (value: SelectorOptions<any>['value']) => void = (value) => {
        $settings[setting] = value
    }
</script>

<List>
    {#each options as option}
        <ListItem>
            <ListOption
                label={option.label}
                name={setting}
                value={option.value}
                checked={$settings[setting] === option.value}
                bind:group={$settings[setting]}
                onChange={() => onChange(option.value)}
                hidden
            />
        </ListItem>
    {/each}
</List>
