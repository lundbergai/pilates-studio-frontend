//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import typescriptEslint from 'typescript-eslint'

export default [
	{
		ignores: ['eslint.config.js', 'vite.config.ts'],
	},
	...tanstackConfig
]
