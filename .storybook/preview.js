export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    options: {
        storySort: {
            order: [
                'Docs',
                [
                    'Intro',
                    'Getting Started',
                    [
                        'Quick Start',
                        'Schemes',
                        'Configs'
                    ]
                ],
                'Components',
                [
                    'Text',
                    'Button',
                    'TextInput',
                    '*'
                ],
                '*'
            ]
        }
    }
};

export const decorators = [
    (Story) => <Story/>
];
