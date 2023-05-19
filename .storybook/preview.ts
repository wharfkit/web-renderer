import type {Preview} from '@storybook/svelte'
import '../src/styles/variables.scss'
import '../src/styles/buttonStyles.css'

const preview: Preview = {
    parameters: {
        backgrounds: {
            default: 'White',
            values: [
                {name: 'White', value: '#ffffff'},
                {name: 'Black', value: '#000000'},
            ],
        },
        actions: {argTypesRegex: '^on[A-Z].*'},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
}

export default preview
