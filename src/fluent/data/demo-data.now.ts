import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Demo data (installed with now-sdk install, --demoData defaults to true)

export const locHeadStore = Record({
    $id: Now.ID['loc_head_store'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_location',
    data: { name: 'WH/OFFICE-1(HEAD OFFICE)/Asset Store00002', branch: 'office_1', is_store: true, active: true },
})

export const locHeadAsset = Record({
    $id: Now.ID['loc_head_asset'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_location',
    data: { name: 'WH/OFFICE-1(HEAD OFFICE)/Asset', branch: 'office_1', is_store: false, active: true },
})

export const locHeadL7 = Record({
    $id: Now.ID['loc_head_l7'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_location',
    data: { name: 'WH/OFFICE-1(HEAD OFFICE)/L-7', branch: 'office_1', is_store: false, active: true },
})

export const locCeoStore = Record({
    $id: Now.ID['loc_ceo_store'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_location',
    data: { name: 'WH/OFFICE-2(BARIDHARA CEO Office)/Asset Store', branch: 'office_2', is_store: true, active: true },
})

export const locCeoL2 = Record({
    $id: Now.ID['loc_ceo_l2'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_location',
    data: { name: 'WH/OFFICE-2(BARIDHARA CEO Office)/L-2', branch: 'office_2', is_store: false, active: true },
})

export const locCtg = Record({
    $id: Now.ID['loc_ctg'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_location',
    data: { name: 'WH/OFFICE-3(CHATTOGRAM)/Asset Store', branch: 'office_3', is_store: true, active: true },
})

Record({
    $id: Now.ID['asset_mouse00101'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'Mouse',
        asset_number: 'Mouse00101',
        asset_model: 'Logitech B100',
        serial: 'LZ2210A1',
        asset_type: 'accessories',
        category: 'peripherals',
        quantity: 6,
        remaining: 6,
        status: 'ready',
        location: locHeadStore,
    },
})

Record({
    $id: Now.ID['asset_keyboard00087'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'Keyboard',
        asset_number: 'Keyboard00087',
        asset_model: 'Logitech K120',
        serial: 'KB8811C3',
        asset_type: 'accessories',
        category: 'peripherals',
        quantity: 5,
        remaining: 5,
        status: 'ready',
        location: locHeadStore,
    },
})

Record({
    $id: Now.ID['asset_headphone00045'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'Headphone',
        asset_number: 'Headphone00045',
        asset_model: 'A4Tech HS-30',
        serial: 'HS30-4471',
        asset_type: 'accessories',
        category: 'audio',
        quantity: 4,
        remaining: 4,
        status: 'ready',
        location: locHeadStore,
    },
})

Record({
    $id: Now.ID['asset_webcam00012'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'Webcam',
        asset_number: 'Webcam00012',
        asset_model: 'Logitech C270',
        serial: 'C270-99812',
        asset_type: 'accessories',
        category: 'peripherals',
        quantity: 3,
        remaining: 3,
        status: 'ready',
        location: locCeoStore,
    },
})

Record({
    $id: Now.ID['asset_cable00230'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'HDMI Cable',
        asset_number: 'Cable00230',
        asset_model: 'UGREEN 1.5m',
        serial: 'UG-15M-01',
        asset_type: 'accessories',
        category: 'peripherals',
        quantity: 4,
        remaining: 4,
        status: 'ready',
        location: locHeadStore,
    },
})

Record({
    $id: Now.ID['asset_ups00031'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'UPS',
        asset_number: 'UPS00031',
        asset_model: 'Apollo 650VA',
        serial: 'AP650-3312',
        asset_type: 'accessories',
        category: 'power',
        quantity: 4,
        remaining: 4,
        status: 'ready',
        location: locHeadStore,
    },
})

Record({
    $id: Now.ID['asset_desktop00211'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'Desktop',
        asset_number: 'Desktop00211',
        asset_model: 'HP ProDesk 400 G7',
        serial: '4CE0281XYZ',
        asset_type: 'fixed_asset',
        category: 'computer_laptop',
        quantity: 1,
        remaining: 1,
        status: 'ready',
        location: locHeadStore,
    },
})

Record({
    $id: Now.ID['asset_monitor00570'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'Monitor',
        asset_number: 'Monitor00570',
        asset_model: 'HP-M24F',
        serial: '3CM339223C',
        asset_type: 'fixed_asset',
        category: 'computer_laptop',
        quantity: 1,
        remaining: 1,
        status: 'ready',
        location: locCeoStore,
    },
})

Record({
    $id: Now.ID['asset_monitor00322'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'Monitor',
        asset_number: 'Monitor00322',
        asset_model: 'rmmnt215nf 21.45"',
        serial: '42417/B1AE512VN005DF',
        asset_type: 'fixed_asset',
        category: 'computer_laptop',
        quantity: 1,
        remaining: 1,
        status: 'ready',
        location: locHeadStore,
    },
})

Record({
    $id: Now.ID['asset_ram00140'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'RAM',
        asset_number: 'RAM00140',
        asset_model: 'Kingston 8GB DDR4',
        serial: 'KVR26N19S8',
        asset_type: 'components',
        category: 'memory_storage',
        quantity: 1,
        remaining: 1,
        status: 'ready',
        location: locHeadStore,
    },
})

Record({
    $id: Now.ID['asset_ssd00077'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'SSD',
        asset_number: 'SSD00077',
        asset_model: 'Samsung 870 EVO 500GB',
        serial: 'S6PWNX0R',
        asset_type: 'components',
        category: 'memory_storage',
        quantity: 1,
        remaining: 1,
        status: 'ready',
        location: locHeadStore,
    },
})

Record({
    $id: Now.ID['asset_ssd00078'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'SSD',
        asset_number: 'SSD00078',
        asset_model: 'Samsung 870 EVO 500GB',
        serial: 'S6PWNX1A',
        asset_type: 'components',
        category: 'memory_storage',
        quantity: 1,
        remaining: 1,
        status: 'ready',
        location: locCeoStore,
    },
})

Record({
    $id: Now.ID['asset_nic00009'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'Network Card',
        asset_number: 'NIC00009',
        asset_model: 'TP-Link TG-3468',
        serial: 'TG3468-221',
        asset_type: 'components',
        category: 'network',
        quantity: 1,
        remaining: 1,
        status: 'ready',
        location: locHeadStore,
    },
})

Record({
    $id: Now.ID['asset_license00011'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'Microsoft Office 365',
        asset_number: 'License00011',
        asset_model: 'Business Standard',
        serial: 'M365-BS-2026',
        asset_type: 'license',
        category: 'software',
        quantity: 40,
        remaining: 18,
        status: 'ready',
        location: locHeadStore,
    },
})

Record({
    $id: Now.ID['asset_license00024'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'JetBrains IntelliJ IDEA',
        asset_number: 'License00024',
        asset_model: 'Ultimate',
        serial: 'JB-IU-2026',
        asset_type: 'license',
        category: 'software',
        quantity: 20,
        remaining: 9,
        status: 'ready',
        location: locHeadStore,
    },
})

Record({
    $id: Now.ID['asset_license00031'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_asset',
    data: {
        name: 'Windows 11 Pro',
        asset_number: 'License00031',
        asset_model: 'OEM',
        serial: 'W11P-OEM-2026',
        asset_type: 'license',
        category: 'software',
        quantity: 18,
        remaining: 14,
        status: 'ready',
        location: locCeoStore,
    },
})

export const channelGeneral = Record({
    $id: Now.ID['channel_general'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_channel',
    data: { name: 'general', description: 'General announcements for all employees', channel_type: 'channel', is_public: true },
})

Record({
    $id: Now.ID['channel_canteen'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_channel',
    data: {
        name: 'BJIT_Canteen_General_Administration',
        description: 'Canteen and general administration updates',
        channel_type: 'channel',
        is_public: true,
    },
})

Record({
    $id: Now.ID['msg_general_welcome'],
    $meta: { installMethod: 'demo' },
    table: 'x_2315548_bjit_erp_message',
    data: {
        channel: channelGeneral,
        message_type: 'comment',
        body: 'Welcome to BJIT ERP! Use this channel for company-wide announcements.',
    },
})
