import { natali } from './natali'
import { temur } from './temur'
import type { ProfileConfig } from './types'

/** All applicants. The first one is the default. To add someone, create a folder like ./natali and list it here. */
export const profiles: ProfileConfig[] = [temur, natali]
