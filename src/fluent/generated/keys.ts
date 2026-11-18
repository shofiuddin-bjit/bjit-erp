import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'app.css': {
                        table: 'sys_ux_theme_asset'
                        id: 'def6aeca1056421cbbbd9c5a65043156'
                    }
                    asset_cable00230: {
                        table: 'x_587205_bjit_erp_asset'
                        id: '993470483b824d5e811a88b01d4fe1e6'
                    }
                    asset_desktop00211: {
                        table: 'x_587205_bjit_erp_asset'
                        id: '917030023d0642368f88595a0d7acfa7'
                    }
                    asset_headphone00045: {
                        table: 'x_587205_bjit_erp_asset'
                        id: 'f3bb118fcb3e414aab80e71c578c0c2f'
                    }
                    asset_keyboard00087: {
                        table: 'x_587205_bjit_erp_asset'
                        id: '7311186de75c4a3983277fdc13075b2b'
                    }
                    asset_license00011: {
                        table: 'x_587205_bjit_erp_asset'
                        id: '67a87ac8f2734219a56926ac548c5b93'
                    }
                    asset_license00024: {
                        table: 'x_587205_bjit_erp_asset'
                        id: 'a33881059fff4f6ca66f4adae07b84fa'
                    }
                    asset_license00031: {
                        table: 'x_587205_bjit_erp_asset'
                        id: '3f76850dd82b478180cce6fb33e0050d'
                    }
                    asset_monitor00322: {
                        table: 'x_587205_bjit_erp_asset'
                        id: 'e35c27bcf206473faa5be7367fa5310c'
                    }
                    asset_monitor00570: {
                        table: 'x_587205_bjit_erp_asset'
                        id: 'd0150a428a33449987843b791acfd6b1'
                    }
                    asset_mouse00101: {
                        table: 'x_587205_bjit_erp_asset'
                        id: '4c84fa40debb4d27b7c2d88242332475'
                    }
                    asset_nic00009: {
                        table: 'x_587205_bjit_erp_asset'
                        id: '511c5fcecedf4be99cdeb8f052ad614d'
                    }
                    asset_ram00140: {
                        table: 'x_587205_bjit_erp_asset'
                        id: '188ff7f7309546c8af398787ca145dfd'
                    }
                    asset_req_chatter: {
                        table: 'sys_script'
                        id: '1b7b99ac136e41e9a4f587a81faa0737'
                    }
                    asset_req_guard: {
                        table: 'sys_script'
                        id: 'f71e110a8dc349e9ab8d17dcf34e0bd8'
                    }
                    asset_ssd00077: {
                        table: 'x_587205_bjit_erp_asset'
                        id: '8eda8303857548f3b941b632447d048c'
                    }
                    asset_ssd00078: {
                        table: 'x_587205_bjit_erp_asset'
                        id: 'ab1f73e030a047e490e92f20e39d4f40'
                    }
                    asset_ups00031: {
                        table: 'x_587205_bjit_erp_asset'
                        id: '644bb42bfa804402a668d25dbc7ca444'
                    }
                    asset_webcam00012: {
                        table: 'x_587205_bjit_erp_asset'
                        id: '2b1345fca4dd423d9181711f0e3d6a52'
                    }
                    bjit_erp_menu: {
                        table: 'sys_app_application'
                        id: 'c9eed97ef9b0433182f1748f6d2d1331'
                    }
                    bjit_erp_module_open: {
                        table: 'sys_app_module'
                        id: '1fe85b0d724b460bb58dca65adc4af62'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '0238fca6defb4469bcff78d456d1d82a'
                    }
                    channel_canteen: {
                        table: 'x_587205_bjit_erp_channel'
                        id: 'a879d746efce4183ab9eb0eb444b8c04'
                    }
                    channel_general: {
                        table: 'x_587205_bjit_erp_channel'
                        id: 'bec3fad39b1e4f0f8a86046b7d9fdf79'
                    }
                    loc_ceo_l2: {
                        table: 'x_587205_bjit_erp_location'
                        id: 'df7fd50c745a424182217664c723f07e'
                    }
                    loc_ceo_store: {
                        table: 'x_587205_bjit_erp_location'
                        id: 'b621effdf6b947a3a6fa2d99b7c7dcc0'
                    }
                    loc_ctg: {
                        table: 'x_587205_bjit_erp_location'
                        id: '9c827beae7ca4302bd278a151b80b133'
                    }
                    loc_head_asset: {
                        table: 'x_587205_bjit_erp_location'
                        id: 'ddbb6d0b501340b0beb24008a68a474b'
                    }
                    loc_head_l7: {
                        table: 'x_587205_bjit_erp_location'
                        id: '1d1f11b90c674bbe952cfe463f8be5b3'
                    }
                    loc_head_store: {
                        table: 'x_587205_bjit_erp_location'
                        id: '8b062c8f13834c53813df2ed0f8b681e'
                    }
                    msg_general_welcome: {
                        table: 'x_587205_bjit_erp_message'
                        id: '7a9e8a40500a4328b018b6800dfd9496'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '2fbd7b3b76104a54903395f69983bbcd'
                    }
                    ticket_chatter: {
                        table: 'sys_script'
                        id: '5bb7c535ed4e4c75933b25bcfbe47e7c'
                    }
                    ticket_guard: {
                        table: 'sys_script'
                        id: 'b01e0f36efdf4910b9ae88a56b3df95f'
                    }
                    ticket_numbering: {
                        table: 'sys_script'
                        id: '0511ae99cc944b09b7a7556cc0d3bdb6'
                    }
                    x_587205_bjit_erp_asset_create: {
                        table: 'sys_security_acl'
                        id: '1724be890ea94044bd6809db01460505'
                    }
                    x_587205_bjit_erp_asset_delete: {
                        table: 'sys_security_acl'
                        id: '7e23e0bac0864d5d9083e768b5d9261e'
                    }
                    x_587205_bjit_erp_asset_read: {
                        table: 'sys_security_acl'
                        id: 'a8b0f116735a44cb81957f8d731acc49'
                    }
                    x_587205_bjit_erp_asset_req_create: {
                        table: 'sys_security_acl'
                        id: 'da643717d6d34fe597900f9d565df206'
                    }
                    x_587205_bjit_erp_asset_req_delete: {
                        table: 'sys_security_acl'
                        id: '9d0ed75ddf314011bbb0784b96ce3cfb'
                    }
                    x_587205_bjit_erp_asset_req_read: {
                        table: 'sys_security_acl'
                        id: 'f2d083656d1f45a89eb69486b1032079'
                    }
                    x_587205_bjit_erp_asset_req_write: {
                        table: 'sys_security_acl'
                        id: '0c03ef6011d1442cabdd2de3e0e3f1cb'
                    }
                    x_587205_bjit_erp_asset_write: {
                        table: 'sys_security_acl'
                        id: '21fe354a8a5b46cb9b57dabf333fdf65'
                    }
                    x_587205_bjit_erp_channel_create: {
                        table: 'sys_security_acl'
                        id: 'dada30b9e06c43b69a6751c0cf973fa9'
                    }
                    x_587205_bjit_erp_channel_delete: {
                        table: 'sys_security_acl'
                        id: '1f152a14e9e34ab28951a0f505c51e9d'
                    }
                    x_587205_bjit_erp_channel_read: {
                        table: 'sys_security_acl'
                        id: '37b076080b4746f38473857bf35976ec'
                    }
                    x_587205_bjit_erp_channel_write: {
                        table: 'sys_security_acl'
                        id: 'b7500a159d464f408e87ed24676a9371'
                    }
                    x_587205_bjit_erp_employee_create: {
                        table: 'sys_security_acl'
                        id: '19e7afe831e2493d8914c7b7b08bd9f3'
                    }
                    x_587205_bjit_erp_employee_delete: {
                        table: 'sys_security_acl'
                        id: '27b5de4e097d4f4590b1514d414bc184'
                    }
                    x_587205_bjit_erp_employee_item_create: {
                        table: 'sys_security_acl'
                        id: '16be48b578cb47d3af3d3d2c4abe70ec'
                    }
                    x_587205_bjit_erp_employee_item_delete: {
                        table: 'sys_security_acl'
                        id: '74cb40b243df4b9288ce92ea80bff11d'
                    }
                    x_587205_bjit_erp_employee_item_read: {
                        table: 'sys_security_acl'
                        id: '5b4ad871b81546b888752d2a36469423'
                    }
                    x_587205_bjit_erp_employee_item_write: {
                        table: 'sys_security_acl'
                        id: '0f7fe3a7cb034ac1bbba446798fa3eb3'
                    }
                    x_587205_bjit_erp_employee_private_create: {
                        table: 'sys_security_acl'
                        id: 'cc7a662f6f7b4e52af0e2db795740167'
                    }
                    x_587205_bjit_erp_employee_private_delete: {
                        table: 'sys_security_acl'
                        id: '6afa4f62e1684c06bbbe6dacdecd14c6'
                    }
                    x_587205_bjit_erp_employee_private_read: {
                        table: 'sys_security_acl'
                        id: 'd9cfc55923c348c58a9dec7208905634'
                    }
                    x_587205_bjit_erp_employee_private_write: {
                        table: 'sys_security_acl'
                        id: 'f56594252a8d44a9b1ba74ad942d25f2'
                    }
                    x_587205_bjit_erp_employee_read: {
                        table: 'sys_security_acl'
                        id: 'a050713ff43541c68f0586c2744f410e'
                    }
                    x_587205_bjit_erp_employee_self_role_read: {
                        table: 'sys_security_acl'
                        id: '0967d4647bc543bab3618ad29fb1294e'
                    }
                    x_587205_bjit_erp_employee_write: {
                        table: 'sys_security_acl'
                        id: '462aed89f41c4028833e1b17a79096cb'
                    }
                    x_587205_bjit_erp_location_create: {
                        table: 'sys_security_acl'
                        id: 'bcb73e1c98ad4939829e8080d1f941fb'
                    }
                    x_587205_bjit_erp_location_delete: {
                        table: 'sys_security_acl'
                        id: 'ed2f95951dde4c8583cd03c3dbf7ea34'
                    }
                    x_587205_bjit_erp_location_read: {
                        table: 'sys_security_acl'
                        id: '57a7b4825a264833a8da3b0c946d7030'
                    }
                    x_587205_bjit_erp_location_write: {
                        table: 'sys_security_acl'
                        id: 'fd048f4e7dae44159e146f553f34226d'
                    }
                    x_587205_bjit_erp_message_create: {
                        table: 'sys_security_acl'
                        id: '1e7b1abbc47c43d3b2bb7e5b7737a680'
                    }
                    x_587205_bjit_erp_message_delete: {
                        table: 'sys_security_acl'
                        id: '197406444b5e4d388f1424c1ee8c054d'
                    }
                    x_587205_bjit_erp_message_read: {
                        table: 'sys_security_acl'
                        id: 'e93f87f89dcd4664befbedadb13f4aed'
                    }
                    x_587205_bjit_erp_message_write: {
                        table: 'sys_security_acl'
                        id: '64d3d36e1d6249218eea974983d7902c'
                    }
                    x_587205_bjit_erp_ticket_create: {
                        table: 'sys_security_acl'
                        id: 'e61e98738c4d416fa8131da8cd95a0c3'
                    }
                    x_587205_bjit_erp_ticket_delete: {
                        table: 'sys_security_acl'
                        id: 'eb7a6a942ade4c9299cc8fa524d47fb7'
                    }
                    x_587205_bjit_erp_ticket_read: {
                        table: 'sys_security_acl'
                        id: '642a7b5c5d624c8980d70649b2268be1'
                    }
                    x_587205_bjit_erp_ticket_write: {
                        table: 'sys_security_acl'
                        id: '0fcb80f9333e4433b81e023ddf665f66'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '002289c442584ee096acf6ad38151ffa'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'national_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '006f4bf8f6cf42169c090fcfe8dfb7cd'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'start_date'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '01bb8050f23d47a2875af55884facea0'
                        key: {
                            application_file: 'c88a75c132de4093a71e6bff0235887a'
                            source_artifact: '7a6e18c36da44f42845a1e335ea82b0c'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '02d0d93fb7ba43a8a61b5f6175e97b7d'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'branch'
                            value: 'office_1'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '036356f6df78417f990c18469b06c00a'
                        key: {
                            sys_security_acl: '0967d4647bc543bab3618ad29fb1294e'
                            sys_user_role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '03dfcb6ea438484785eefe967ae2b54d'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'category'
                            value: 'network'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '045a1bdefa2448fb9545bc6772f56e85'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'platforms'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '04839dc0101040d8890b88c47951383a'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '04add1d9e4ab4dc59a78e9255015fb1a'
                        key: {
                            application_file: 'a061f470c0e348baadf01020c839e455'
                            source_artifact: '7a6e18c36da44f42845a1e335ea82b0c'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '059acc2c669c4a498df850636dbcc143'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'category'
                            value: 'software'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '067a1022523449ff91d38e71a455ca6a'
                        key: {
                            sys_security_acl: '642a7b5c5d624c8980d70649b2268be1'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '067f44a7f6234d23b183a87f1a4e4d1a'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'platforms'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '06885cb436e64ebf9ff30b788eaf746d'
                        key: {
                            name: 'x_587205_bjit_erp.manager'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '06a0849d42bc4386bd2df6fbbc0be5f4'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'author'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '072de6baf7af415484e88437bde7fe58'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '08578e6577424c77b66f68a01176a7c4'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'teams'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '09022243355948e0aac9c5c2a356e56c'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'job_title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '090ad312e31d400c8f053517a99ab672'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '09b24ea9f3744da0895c288e58ad31d1'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0a5e7ee86e36429eb77581d735b54b1b'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'category'
                            value: 'access'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0b233468193842e397e6e8bb04f34c6f'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'status'
                            value: 'repair'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0bbd3621c1e64c7096d1e50818e1baf9'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0c28569270e54ba59e2639cc16335ef8'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'category'
                            value: 'experience'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0c9bcd14af7e44a49fa2886bebd30cff'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'gender'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0cc9cc32d8ea4cceb211fa74700968cd'
                        key: {
                            sys_security_acl: '0967d4647bc543bab3618ad29fb1294e'
                            sys_user_role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '0d5d91fe1c464856a676640a1b0131de'
                        key: {
                            role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                            contains: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0d88e33147ed449481f33315ed548f7e'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'channel'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0e509a38925e402291a1be6ad940aa51'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'category'
                            value: 'software'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0eddbb4813cc4ce9a8ae9b77cf9be8f3'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'requester'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '0f0e9ef38d7a4287ad677930c18f1ff0'
                        key: {
                            application_file: '14b028e1a6ad424a96caea0231a49cd4'
                            source_artifact: '7a6e18c36da44f42845a1e335ea82b0c'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0f73e0b8b6ec4593a8914126a15065a0'
                        key: {
                            sys_security_acl: '74cb40b243df4b9288ce92ea80bff11d'
                            sys_user_role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0fa152adb37f4ccc999a359959b33fb8'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'release_type'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '102ba226dd134e81a25f35e2b532ce59'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '104421cb41704ce397c26e4d0b017942'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'branch'
                            value: 'office_3'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '106a2e1ddcf044c3b4605c0a59b75c12'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'request_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1155a128a2a242958255c431dd2a2ce9'
                        key: {
                            sys_security_acl: 'a050713ff43541c68f0586c2744f410e'
                            sys_user_role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '122e1883113b42c4939e74fbf966fb73'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'branch'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '124dbfe239b045ce9907172e3c164fad'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'present_address'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1276c080c4314ff886ac8fc9250ad402'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'asset_type'
                            value: 'fixed_asset'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '127928914e5f4180872d3991187d6bef'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'biometric_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '12d7d2b20d5b4ca9baddbede06bbaa91'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'employment_status'
                            value: 'regular'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '12ef2091f57e4946aa79c0db7a000c6f'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'gender'
                            value: 'female'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '136f771430dd45a681b0500514e615a9'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'gender'
                            value: 'male'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '14b028e1a6ad424a96caea0231a49cd4'
                        key: {
                            name: 'x_587205_bjit_erp/main'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '14b850a4b1df4989bbfc2583f82165e8'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'purchase_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '14e0c40ea5254c71804900fea44f727d'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'state'
                            value: 'closed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1593e661bb864d44be5ddab7ffc3ce94'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '166848f3d5534e38ac1cea2853a5133b'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'message_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '16783b89fbd249a29ffc23808924caae'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'work_address'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '16dd6f40d861486bacd3a89fc34ca545'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'start_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '170ef646f75f4e4b9a3aea91f1121d25'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1787bdcdee44481fb96836dce4c1dccc'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'employee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1804228c273c4fce8a57bd9aafef953b'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'work_phone'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '18391ec793f944f9b5e43ee968fe8c3c'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'passport_number'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '1920ba5f24c34ca39aa65de455b9c368'
                        deleted: true
                        key: {
                            application_file: 'd19ee4340eff46a1b61960872e566dfd'
                            source_artifact: '9f0ace3fe01d4fccad23453eb85da078'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '19e04a69b9af4e9e981c84f06e13e91f'
                        key: {
                            sys_security_acl: '19e7afe831e2493d8914c7b7b08bd9f3'
                            sys_user_role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '19e0a4569b564446958170fb612543ee'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'approval_manager_3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1b0c0e568729429588fc4267dff84bc2'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'category'
                            value: 'project'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1b410b4f24e044d5810430b089a8e2df'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1b51c3b7dd02436caf9840711f10fcb1'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'major'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1bdebd6e307d4a31be6bd42deb085c3b'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'category'
                            value: 'network'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1c6faa15aee0409a85a8ebf576da6da0'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1c8bd5062f0a4206859aeed7106460a3'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'request_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1f6bdfaa2f3e46818948c477dc5c52be'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'resource_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '204c42dd846d459a82ed2f59d43974f0'
                        key: {
                            sys_security_acl: 'f2d083656d1f45a89eb69486b1032079'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '20cd9a10b0fa48b0960d550c9c43929d'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'branch'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '21108036f9354f2f81889233f3836607'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'category'
                            value: 'power'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2129ffffa5444796b40e9dee2d2d9947'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'approval_manager_1'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '21eddeb45e2749008e1b087b74804c38'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '21fbd282b73241daba0f40076af4646d'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'date_of_birth'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '2301adf1adc048d89961f3bf5477c794'
                        deleted: true
                        key: {
                            application_file: 'c88a75c132de4093a71e6bff0235887a'
                            source_artifact: '9f0ace3fe01d4fccad23453eb85da078'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2351bca622fc471387de87e95327c737'
                        deleted: true
                        key: {
                            sys_security_acl: 'd9cfc55923c348c58a9dec7208905634'
                            sys_user_role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2392c95a05884d81ac1f53ee929a8b6b'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'resignation_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '23a467cd362a4b1fa432adbd7fcb466c'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'category'
                            value: 'promotion'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '254429f9007747b0aff59343a613118e'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'branch'
                            value: 'office_2'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2589158fb2ec4c19b3ea1a80c086f68f'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'support_location'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '25fc1aeb9db24eeb9ff63757a5399529'
                        key: {
                            application_file: '2ece8c2bc0a64c86820120c4788a5772'
                            source_artifact: '7a6e18c36da44f42845a1e335ea82b0c'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '266be9f9d0cf496cba948bf0f3464c81'
                        key: {
                            sys_security_acl: '1f152a14e9e34ab28951a0f505c51e9d'
                            sys_user_role: {
                                id: '06885cb436e64ebf9ff30b788eaf746d'
                                key: {
                                    name: 'x_587205_bjit_erp.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2882aec0ce67481085d995a1e1ea8156'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '28c8bbd02e2d44529eebe8f2c6d947a9'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'organization'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '29082fdcc5eb446cb0d0bbd0eddadcee'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'state'
                            value: 'in_progress'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '29d6e253e4aa4020a129a6ecc4877464'
                        deleted: true
                        key: {
                            sys_security_acl: 'a050713ff43541c68f0586c2744f410e'
                            sys_user_role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '29e2e56980034079afa52f2fd8040b01'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'support_type'
                            value: 'installation'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2a18d0f7079f4a6dbf14fe43d13b1193'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'category'
                            value: 'technical'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2a1fe3c5969e4fc09609a2d4a1c0c312'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'branch'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2b95a42846fd4c4fb208cbf31928942c'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'needaction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2c5f28de23854042a1841d30a232cb4e'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'employee_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2c702b457a2e400ab6fd321a7eaf6595'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'ups_account_no'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2d4eefaa4b394a4199d7f2570a6dd11d'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'needaction'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2da7d57ab2134500834f3cfcf4b32d47'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'asset'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2daee9bdd40f4238b67ad28acf21f66f'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2e3524aea7c2471fa3d7bf2ca3f9ac1d'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'branch'
                            value: 'office_3'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2e4471d0201f4015822b42e80b02e5e9'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'channel_type'
                            value: 'chat'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2e47f967cdb24978a73e4c6a796294b6'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '2ece8c2bc0a64c86820120c4788a5772'
                        key: {
                            name: 'x_587205_bjit_erp/vendor-react-dom--55da69dc.js.map'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2fc54e1c72824255a5d4c1f499df6cd9'
                        key: {
                            sys_security_acl: '0f7fe3a7cb034ac1bbba446798fa3eb3'
                            sys_user_role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3077405a84d6410e9c39a31c5da3394e'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'job_rank'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '324bf397cb674314afabd5bea12bd2ea'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'state'
                            value: 'completed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '331bb7e219854ab8aa623d3564cb82aa'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '33553ffa4e7a4ad78f3684c011bdbf74'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'record_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '33997631a79048f1876924141f85ed04'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'support_type'
                            value: 'repair'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '346f69feac03454d9c3916bc308ad9a3'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'gender'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '34756d89826e4e6a8f4d3991f2b7c3d5'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '348d951f3830408bb9078a6b5ffccc65'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'job_role'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '34c1a9432a384799ad48e497644437ea'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'employee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '35454f696f7d46e492bee6728f919fa5'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '36340b4854854dd98dfd859ecc7d6d44'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'office_location'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3647e533700e4fcbbd62b873d956806e'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'employment_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3651c052d03f45b7a1f533d5e0339245'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'starred_by'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '36643b59773e4a88acdab12405c2bab2'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '37a4ea12074f4c119eb71dba434f4072'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'category'
                            value: 'peripherals'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '38f53955b1fa420ba9c2cab7698f953e'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'work_mobile'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '396c716b79f54876b91e355823868956'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'asset_model'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '39bcc545a9e14e03af34c1c7f95cd3b1'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '39d358141ee14d62a2f17283134448ac'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'asset_type'
                            value: 'license'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3c04f4f927514cfcad78313bf183bf74'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'approval_manager_3'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3c0605fc018e45af96fd17cc8686a981'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3c58f78b3dbc4e129a5be2f052b014ec'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'quantity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3e42186187cd4504b666dc20b42b8fa0'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'body'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3e64909489a448368784e0a1e9417726'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'purchase_date'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3ed230a0ba234652b927e1df6dcf9a4f'
                        key: {
                            sys_security_acl: 'b7500a159d464f408e87ed24676a9371'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '3f1cf9be3c8140dfb421bac685bbaad9'
                        key: {
                            category: 'x_587205_bjit_erp_ticket'
                            prefix: 'SUPP'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4003d8cdf55240b1a4617c031956f985'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'model'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '403913157d7943c089f19742814c5e02'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'confirmation_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '40f5d3a292784e3bbd4775debdc10931'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '42decaa4939543dba220113963dabcb7'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'author'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '438f452647524fca9ef9fec23f53f976'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4397b1b222bf4701afc33968509f5860'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'working_hours'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '43ead06f1b1249558a2d9f246d67ee1c'
                        key: {
                            sys_security_acl: 'e93f87f89dcd4664befbedadb13f4aed'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '44f143b393cb4fe59952f883af6fb4cf'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'branch'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '44f4aa80ecb54b8080b17f2c06658ab0'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '45f35a8a28194d35a1a76def18e01745'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4635cdad3cbf40e4bd0444808245e5eb'
                        key: {
                            sys_security_acl: '0fcb80f9333e4433b81e023ddf665f66'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '475ce70cf9184c7bb81b4a21be2a5f4a'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '47eb664a7a3f41b58ee7924a52c5266d'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'category'
                            value: 'other'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '48e38ed7befa40ff9bee026ac8f40d20'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'teams'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '49afde4bbf554cb4a0374d96e918d321'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'is_public'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '4a0483851775416dbe11c706c24daad6'
                        key: {
                            role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                            contains: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4ac1e18c0b854788a24d6908f34367f5'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'employee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4b16a04ccc794316b2273e3c3068ee81'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'organization'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4b3d540e09df47568a01ed0f5857ce05'
                        key: {
                            sys_security_acl: '21fe354a8a5b46cb9b57dabf333fdf65'
                            sys_user_role: {
                                id: '06885cb436e64ebf9ff30b788eaf746d'
                                key: {
                                    name: 'x_587205_bjit_erp.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4bbf9ebd039745c19a33b46dce596352'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'identification_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4c2e6a2a92c648379708f64995bcfdd7'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4cfb583d149a4ea8ab5ee95d040ff6b7'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'join_date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4cfccc4c3611422db4aec3236224c334'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'category'
                            value: 'qualification'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4dd099e2dc0f4e949455705e32eaecbb'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4fb4dc073e19406cb9e81b3588cdfaa3'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'quantity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5146ca4d6241400e8a7df636fbe9d36f'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'marital_status'
                            value: 'single'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '52cbddd6a0734568b8f1da5dd131c056'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'employee_old_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '52d73416d57a49ee9b54e11e524d894f'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5341dde86a2b40709a822b3f5d5b55ec'
                        key: {
                            sys_security_acl: 'e61e98738c4d416fa8131da8cd95a0c3'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '536ff9c3c60d4975ab980e1c8fe0f40d'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'priority'
                            value: 'low'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '53753e05dc954713bd7f2a5e97088dfb'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'user_comments'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '53f8984692c9429c917f936c21781a5c'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'end_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '552c7cb682154c528059b51c5ebd5ace'
                        deleted: true
                        key: {
                            application_file: '9057ceafea0c41ecb0912f74231295d2'
                            source_artifact: '9f0ace3fe01d4fccad23453eb85da078'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '55c7ecfb201d49bcb0075da62231e8ee'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'employee_type'
                            value: 'employee'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '566512087e0341ca97ba908c023f325e'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'record_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '56651a3fa55d4948a665a94c6b22404c'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'home_address'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '57f2510bf33049b9ab38697df995d378'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '586a269f0d3845aeb56460a6fffece14'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'tin_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '58cc6f87f9664d68a0609d25ebf95265'
                        key: {
                            sys_security_acl: '37b076080b4746f38473857bf35976ec'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '58e23b0f2c024c068d089dd1813ca0f7'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'request_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5a84e2ff605d47ae93d36def84ddbf1f'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'biometric_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5b077013ac5c48ab9a7ae300d0c6d3bb'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'reject_reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5b43f0334b2541239d63fa069cbda9fe'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'category'
                            value: 'audio'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5c7a14ac179e4510bbb7deb31162e0e7'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'approval_manager_2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5c9a3719580e456f91b270dad5ccdc34'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'tin_number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5dc5a9b883114bc6bcdc0cab07d89eb7'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'manager'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5e2a63f555ac4df0922c45c381103d5d'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'asset_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '608ab9fe8c9f49bcbdd1ed0f230fca8a'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'nominee_contact'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '60a7abdf7ca04190bcfd4ee0fa40dc29'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'private_address'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '60a95996168f47339631b821ebb842b8'
                        key: {
                            role: {
                                id: '06885cb436e64ebf9ff30b788eaf746d'
                                key: {
                                    name: 'x_587205_bjit_erp.manager'
                                }
                            }
                            contains: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '60c865cf9e5b4a52b9f5a9c7bedd764e'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '61c4d66f10504057b8c6f4b47cb5455f'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'home_address'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '63fdfe7d8ef34defbefd650a7b1cde96'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'manager_comments'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '649cba1cffcb4c44a4034e8c83d77784'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'national_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '65f6a03c6b64488aac9219fec1c661b2'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '665b036a71074619808226ed739b663a'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'resource_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '676b6a2378ad4725a6cc72923dc0393f'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'nominee_relationship'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '679b71886c0940b48bc3341a8e40ad11'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '67c570b4213f42e6b45dd2875e63ed91'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'identification_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '67fdad6509934ded95f4c3af9b9406f1'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '684c195957874c1f8b75f7386f8ac69a'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'responsibility'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '68d3bf372b544e258530f065cec649fe'
                        deleted: true
                        key: {
                            sys_security_acl: '6afa4f62e1684c06bbbe6dacdecd14c6'
                            sys_user_role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '68f7c45e4f2243d7a7d188e8911c10ae'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'support_type'
                            value: 'new_requisition'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '691df650b58941ceb148422d48545157'
                        key: {
                            sys_security_acl: '1724be890ea94044bd6809db01460505'
                            sys_user_role: {
                                id: '06885cb436e64ebf9ff30b788eaf746d'
                                key: {
                                    name: 'x_587205_bjit_erp.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '69ff827087ab4bfb993adfd2130561b3'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'asset_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6b3717aed4c94177a6a0799ac2ad4ecf'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'employment_status'
                            value: 'probation'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6b3dc1989e9a4190b491a2c27aa92dc5'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'status'
                            value: 'ready'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6c5af7ad24cc4799be290d7e7987e498'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'religion'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6d77d7afb0f243dd818b297bdb063467'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'state'
                            value: 'draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6e11f94a60c64ef8a4a0f4e19e6ce38e'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6e556cf37d784393a0083d0f12d7db5d'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'assigned_to'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6e7b621758f24f8b932a631adb9bcca5'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'work_mobile'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '6f929491724b46ecaf09f9879e75dffd'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'support_type'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '6ff41cea3f3c4f1489f58e7b945a337d'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '702130c6e2f3433bbff8b8bfc409250d'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '70256c5e57b94cf58092529fa2c8e4dc'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7072c5fbfdf34248b67630ce30a63a95'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'branch'
                            value: 'office_2'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '716654ee711a4dfbab7511162fdb02a4'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'employee'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '71a6147159d54f2d87d9b5a8a01f1c92'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'promotion_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '71b6a8a4ecf3423cb85516002075c109'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'major'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '72407baa6918464e9438374e201107b4'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '725fad8a01e74eeab18c8aadf056c54b'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'religion'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '72caa6d50af6442fa0e232462cf5dc14'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7388a7739b834d938deac4ef94cd3b17'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7400753f52304c4cbf3ad211a715ff38'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'nominee_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '74c61b914f3c40fab3ad7ebc78052e89'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'working_hours'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '75b42f8bd3d94e639e6aa2e5c1cc4e5b'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'employee'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '765cef4cc11d492aa83d8974ffbe8987'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'resignation_reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '76972c8596414db9b853ea6a990a6902'
                        key: {
                            sys_security_acl: 'bcb73e1c98ad4939829e8080d1f941fb'
                            sys_user_role: {
                                id: '06885cb436e64ebf9ff30b788eaf746d'
                                key: {
                                    name: 'x_587205_bjit_erp.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '774e849b5222486786707bb6c3392fd2'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'employee_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '77f189c4e87248c6b3d556aaa4ee3395'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'category'
                            value: 'furniture'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '79bbbd35e2164f3aa1db4334083b6ecd'
                        deleted: true
                        key: {
                            role: {
                                id: '06885cb436e64ebf9ff30b788eaf746d'
                                key: {
                                    name: 'x_587205_bjit_erp.manager'
                                }
                            }
                            contains: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '79e649f779f948ab83cfe317dc33fb19'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '79e6d87230fd44efa62903727c292da1'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'priority'
                            value: 'urgent'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '7a5730475407478391f2fb9f957084fc'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '7a6e18c36da44f42845a1e335ea82b0c'
                        key: {
                            name: 'x_587205_bjit_erp_app.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7b9d2ca09c1d41588164911511e901ee'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'category'
                            value: 'certification'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7ba6919ccf924a70953ec7c5ab59a371'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'employee_old_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7ca08e3e705442a8b34414b45a370e73'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7d2f856756144e579434e7b30a865791'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'nominee_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7d7db533f3bf455a848c26037d4a6a64'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'promotion_date'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7dbcc8f475b64ad199d541343d1c0f18'
                        key: {
                            sys_security_acl: '6afa4f62e1684c06bbbe6dacdecd14c6'
                            sys_user_role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7ec5725d548147ec9f7c6faacbe6469d'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'request_date'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7fe03e780e5f42e681d40f157708c753'
                        key: {
                            sys_security_acl: 'f56594252a8d44a9b1ba74ad942d25f2'
                            sys_user_role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8069ebf483b649449994c79da4ea506f'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'support_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '80d106570a8245b3850151da157d412b'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'employee'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '80fd055f39274bd2b2b60962c210739c'
                        key: {
                            sys_security_acl: '7e23e0bac0864d5d9083e768b5d9261e'
                            sys_user_role: {
                                id: '06885cb436e64ebf9ff30b788eaf746d'
                                key: {
                                    name: 'x_587205_bjit_erp.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '812ea6576f504521a35c54742b9c8e92'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '82e19572d20e483d828a28a4dd62aba9'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '836126adfe344ba8be939f9cd7f3f3ef'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'gender'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '83dc99d457f249f6b21fd9b01cc34b47'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'marital_status'
                            value: 'other'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '861ac1b484a44be5ac5408c900a21c72'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'job_rank'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '86f18aa5e438436593c3e6135d5e8a00'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'body'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '879e152ce04a45a69de8602a288ff328'
                        deleted: true
                        key: {
                            sys_security_acl: 'cc7a662f6f7b4e52af0e2db795740167'
                            sys_user_role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '882b2089a0e046a28993da3bf7f907b6'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'state'
                            value: 'confirmed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8978caf0197649ceacf4fa33644afed3'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'employee_type'
                            value: 'intern'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8bca32b256b34eeebec4ff26522543d3'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'job_role'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8cb389048d324f0a93f31d52b7e0b3ec'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8cdfd65c57e4436da6c0287997e145d3'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'resignation_reason'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8da469c8a2a74ee099ce5b1df47b269d'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'state'
                            value: 'first_approved'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '8db73525ba664d8baf24fd1ccf9fad2a'
                        key: {
                            category: 'x_587205_bjit_erp_asset_req'
                            prefix: 'AREQ'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8e4dd91b8b7f4ea39ab049e79c6f37a6'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'support_type'
                            value: 'troubleshooting'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8e6a1a002c334dc9b8c2dfcffcf4a650'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'bank_account_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8fa601d352894f7ba578f28ac688f893'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'category'
                            value: 'hardware'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '9057ceafea0c41ecb0912f74231295d2'
                        deleted: true
                        key: {
                            endpoint: 'x_587205_bjit_erp_incident_manager.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '91772891b999427a9bbd2a2d5f4b2562'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'end_date'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '91de16b4c7a74a2388037051ca8e0ad4'
                        deleted: true
                        key: {
                            sys_security_acl: '16be48b578cb47d3af3d3d2c4abe70ec'
                            sys_user_role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '92655b9335e4499dbe4b3a11d1ddfbf9'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'message_type'
                            value: 'note'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '929dd86c03ed498cbe0fe7e87754d4b6'
                        key: {
                            sys_security_acl: 'fd048f4e7dae44159e146f553f34226d'
                            sys_user_role: {
                                id: '06885cb436e64ebf9ff30b788eaf746d'
                                key: {
                                    name: 'x_587205_bjit_erp.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '92a03acda9474a3f8b601c8133c6fc98'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'blood_group'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '92ef0a4b5a5d469c85882a4efbb770eb'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'department'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9381ec70c41947bd8c75a9378bab04a0'
                        key: {
                            sys_security_acl: 'cc7a662f6f7b4e52af0e2db795740167'
                            sys_user_role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '95459597a26949c2a5253025d2469669'
                        key: {
                            sys_security_acl: 'eb7a6a942ade4c9299cc8fa524d47fb7'
                            sys_user_role: {
                                id: '06885cb436e64ebf9ff30b788eaf746d'
                                key: {
                                    name: 'x_587205_bjit_erp.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '955d8c9b1a0040ec999262e04f224359'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'ups_account_no'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '962ada66e2314c268767477f9817a399'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'requester'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '96a9f6fbc81c4a8fa651093d4e9d0676'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'state'
                            value: 'draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '97301320c8cb43c1a45151b78b00b263'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'support_location'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '97bc4fa826ae43f4a3f0d464b413800f'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'user_comments'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '97e8ee59f43641df9f7a96c21f53a055'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'passport_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '986752db9abd490397406cb88451df90'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '98e2ad260dd144b5a12f1529aa4ddea3'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'marital_status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9946dd93323943c68abed32e0b73c5a9'
                        key: {
                            sys_security_acl: '462aed89f41c4028833e1b17a79096cb'
                            sys_user_role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '996df53041c9475bbbd9c511d3def74e'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'priority'
                            value: 'normal'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9a0b2090b84c467baf060440afadb177'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'employment_location_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9a2de51537684f35b8b5dbbe957cca0f'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'support_type'
                            value: 'configuration'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9a47fd87c9474a8c8c54e343f2d9d9c8'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'manager_comments'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9b401b2c1e0d4c7eb096a481a6bcd7e2'
                        deleted: true
                        key: {
                            sys_security_acl: '74cb40b243df4b9288ce92ea80bff11d'
                            sys_user_role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9be5b7dc034f4a2b9d3b301d22378255'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'category'
                            value: 'computer_laptop'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9cc02806c364485c8cce3ec63062fca2'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9d3dfaaa1e27425ba2402ba0a8c602f1'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'resignation_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d975eb71efe46cf9b3bb239190d9eba'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'is_public'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9e81148b105c4491b17175ea1c08a503'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '9f0ace3fe01d4fccad23453eb85da078'
                        deleted: true
                        key: {
                            name: 'x_587205_bjit_erp_incident_manager.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'a061f470c0e348baadf01020c839e455'
                        key: {
                            endpoint: 'x_587205_bjit_erp_app.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a0ff449792aa44cf9492bcfa89f512da'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a14cefb09e3441b88764c8192f36dbba'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'work_email'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a1791ca3d4a047b9a006ce36dab80a39'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'approval_manager_1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a1e3b2576dd34235956f852123571826'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'history_users'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a209486ff36241ffaa826b63280249a0'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a4926d4a53b947cb88fc0effd7208604'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'model'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a49d8180ccf84f8baee21a08543cec8d'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a5814d1b6f9e4163b7190d90f9130894'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a5ce42a4f5b343fdad2eec4f7c69f4c0'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a737817139874e5dbb9096011fb107b6'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'support_type'
                            value: 'replacement'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a7422bb11781468c966d357a3d7a6833'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'location'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a7c3683bf355460ba87b11a53f733b9e'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'a880ec94c92e47ac89464bc80179d012'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'message_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a8d295ce7abf4a4088e586d9c6c8db52'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'reject_reason'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a9d074e69b2f4f568567d9e891c0ed5f'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'support_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'aa16fb7281d142458da438666d23922f'
                        key: {
                            name: 'x_587205_bjit_erp.employee'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ab417c53fba24cbaa81df491f49b2d27'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'employee_number'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'ac8118b641484a60922327304fa9ee70'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'acd8f1bfdda343ccad19cf5c29d74c0e'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'channel_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ad8fe32c0a4d4b45bfbb39821f1a5135'
                        key: {
                            sys_security_acl: 'da643717d6d34fe597900f9d565df206'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aea4a1c8558e4f88b9cb5f9af7de5414'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'channel'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'aebcac394c284bbe92266d4f9050d446'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'gender'
                            value: 'other'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'aeeffa7c6acc453ca7d47d54a29cd072'
                        key: {
                            sys_security_acl: '0c03ef6011d1442cabdd2de3e0e3f1cb'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'af3ee2d8abb644c3bc88ec054e5cf375'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'afd91d88bc664302b8f5b0d86a65e8a0'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'employment_status'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'b03eb0a8c38b49c7bc972fc322c82454'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b08646c4198047f3b8d9548dc86d0afc'
                        deleted: true
                        key: {
                            sys_security_acl: '5b4ad871b81546b888752d2a36469423'
                            sys_user_role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b1784a4930e3463bb01932272b194f01'
                        key: {
                            sys_security_acl: '1e7b1abbc47c43d3b2bb7e5b7737a680'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b1efb5350f694ffe80eb9153c4deecd1'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'b220d00998b74321b98cc87e26ce58fd'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'employee_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b2709dfb53c84937b66088dedb9f4178'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'marital_status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b34ebe10b21c47788088adc3c3383171'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b4bd034de5fe453c9989bf349beb4461'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'category'
                            value: 'training'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b4da1b669ae1400ba3edac6b3d943ec3'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'work_address'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b5f4786724574c4081b4eb21bafd1f27'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'assigned_to'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b613dcc7884540cfb663fa997b4289ea'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'message_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b6882c787bbc4b2cbdf101c0d4b167f7'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'date_of_birth'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b6cb4755cd974c3caca1105b9c201b63'
                        deleted: true
                        key: {
                            sys_security_acl: '19e7afe831e2493d8914c7b7b08bd9f3'
                            sys_user_role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b813b63de13741188ddae3bbcb02afaf'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'asset_number'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'b826fe7d31a748f6adc84c2db9de09c1'
                        key: {
                            name: 'x_587205_bjit_erp.user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ba3bfe2fb236433a806168de3e90f774'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'employment_status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bba9e5fedc174368bad46f5b3e2f4ed3'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'confirmation_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bc877c17ec5d4fa29067f430af3a340c'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'responsibility'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bd26b0dada144d7ca930d3998d7e1efe'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'private_address'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bdad2340d2cd4d4dba166410f431fe49'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'approval_manager_2'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bedcbc11a0194bba9c62578f4d82f563'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'bank_account_number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'beec1042d1684824bc17c864bc85cd2f'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'branch'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                        key: {
                            name: 'x_587205_bjit_erp.hr'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c0926ea791f141e1a163a19ad17b1622'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'message_type'
                            value: 'notification'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c13abcd067dc4aa0854073e8ef4cc201'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'channel_type'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'c1716851f80a4f679b029331c46f3f73'
                        deleted: true
                        key: {
                            application_file: '2ece8c2bc0a64c86820120c4788a5772'
                            source_artifact: '9f0ace3fe01d4fccad23453eb85da078'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c264f0e17c2847de80991d5254835cc5'
                        key: {
                            sys_security_acl: '16be48b578cb47d3af3d3d2c4abe70ec'
                            sys_user_role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c30cc57c583240c4ac326932d11777c4'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'remaining'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c3d0118dc55e4bd58d0abe1903e2e032'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'status'
                            value: 'deployed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c594533aa12949829c6e7f01843cdaa1'
                        key: {
                            sys_security_acl: '57a7b4825a264833a8da3b0c946d7030'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c696013714f147699e57a3138f493402'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'category'
                            value: 'email'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c7164e7a40a640538e8282da7c19c103'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'asset_type'
                            value: 'accessories'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c7542cb0af4e40d7a79346302d3a022c'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'asset_model'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c780747542114c239b385dc6e465eb47'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c7a8ae1a982449259b6be6f0648401f5'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c7aeb6901cb84caaad2296ea77980ea4'
                        deleted: true
                        key: {
                            sys_security_acl: '462aed89f41c4028833e1b17a79096cb'
                            sys_user_role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c835b3fac85e4b009bed6bbb1af63ce0'
                        deleted: true
                        key: {
                            sys_security_acl: '0f7fe3a7cb034ac1bbba446798fa3eb3'
                            sys_user_role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c85427d372f3462b867749b7efe9c927'
                        key: {
                            sys_security_acl: 'dada30b9e06c43b69a6751c0cf973fa9'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c85f7eb544e943d7b5075b8b564c762f'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'location'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'c88a75c132de4093a71e6bff0235887a'
                        key: {
                            name: 'x_587205_bjit_erp/main.js.map'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c9ebf6de046341e0ad6bbfc573d16fa7'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'nationality'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ca390abcdaa14ec1aabe8fc64e698888'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'state'
                            value: 'cancelled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'caab8c3461fb4344875957424008ea64'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'res_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cbd3a47037bd472b8c2c500cd04ca7bd'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'branch'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cc391005af6b4ff28fb1696601ffae4e'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'channel_type'
                            value: 'channel'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cc7965dd42624778b6c32fbb484da5c6'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'message_type'
                            value: 'comment'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'cc9331c917784bb1ab6c8141a3e259b0'
                        key: {
                            sys_security_acl: '9d0ed75ddf314011bbb0784b96ce3cfb'
                            sys_user_role: {
                                id: '06885cb436e64ebf9ff30b788eaf746d'
                                key: {
                                    name: 'x_587205_bjit_erp.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'cd69d968464a4f0c9d8d0cdfc418e7c9'
                        key: {
                            sys_security_acl: 'a8b0f116735a44cb81957f8d731acc49'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cd74f43afe01466f8f98f2efa5de15fa'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'blood_group'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cdc69e85ce244cef9b0e1d41f946d4a5'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'job_title'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'ce69af44ed184d15952d5f533c98ffe2'
                        deleted: true
                        key: {
                            application_file: '14b028e1a6ad424a96caea0231a49cd4'
                            source_artifact: '9f0ace3fe01d4fccad23453eb85da078'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ce6f183d56754eb8b23f7924ee426e79'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'nationality'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'd02964432b1f444ca5607495d8835ee0'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd07fd7d696bf4de490474d59e0be0fc2'
                        key: {
                            sys_security_acl: '197406444b5e4d388f1424c1ee8c054d'
                            sys_user_role: {
                                id: '06885cb436e64ebf9ff30b788eaf746d'
                                key: {
                                    name: 'x_587205_bjit_erp.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd0eb0fcfcd5646438320da3c2daa83ee'
                        key: {
                            sys_security_acl: '64d3d36e1d6249218eea974983d7902c'
                            sys_user_role: {
                                id: 'b826fe7d31a748f6adc84c2db9de09c1'
                                key: {
                                    name: 'x_587205_bjit_erp.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'd19ee4340eff46a1b61960872e566dfd'
                        key: {
                            name: 'x_587205_bjit_erp/vendor-react-dom--55da69dc'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd22d01bc698841198b30c8613b9bcad8'
                        key: {
                            sys_security_acl: 'd9cfc55923c348c58a9dec7208905634'
                            sys_user_role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd4d7cebf1b0c4fc4a5f90480a8676db9'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'asset'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd4f416ceb9db4a3b80a9cd06c4a6c27c'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'employment_status'
                            value: 'contract'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd525603c8d0a4344a3d8a4c41bf56ceb'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd59ec3da880b466ebe0a208c4ed413ea'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'employee_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd5af803bc54f40f5865a8a9ffb9f4d25'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd5e92b9212c44b938c2f3eac8579b25e'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'employment_location_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd5fb49e37e6a4e2f9baac81a3796555f'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'join_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd7521316b68641068246796506773b2f'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'state'
                            value: 'allocated'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd7ae202923454402b6fe5a28c88a9450'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'nominee_contact'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd85f97ed56a64308b6a52fabd4d93e91'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'd86db361080941ab8ae01ae62ceeda7c'
                        key: {
                            role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                            contains: {
                                id: 'ee30b5b7579e4cdfb5ff08776647eb9b'
                                key: {
                                    name: 'snc_basic_auth_api_access'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd8c356ab42dc4fc0be3ab27fd6c9c867'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'status'
                            value: 'archived'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'd92f156354a846efab8ab06d516673d6'
                        key: {
                            name: 'x_587205_bjit_erp_employee_item'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'da148db915e0456ea10b979f8c5e3966'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'manager'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dc904e06d3684b2f8a2d1865991b4b77'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dcd877e18a9640ec9fbbbbd86176afba'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'nominee_relationship'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'de59695e253e469bac02d4065634687a'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'state'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'de679c642c2f4b21955cbaeceeb4116c'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dec75a16d46347ac84ea5e5561ffd184'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'remaining'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'df3dbcd475fe41de91363576c9a45be6'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'res_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'df7aec647eb541fb88d044a345799bb5'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'members'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e037e598ce084ffdb895372affdb7a82'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'department'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e0bdcc822b114765bbf0eb71bf2fe926'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'release_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e180347a52bf4629bc3fbda9874a1c80'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'status'
                            value: 'pending'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e1809a9179a04c51b41777ca90b48d91'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'state'
                            value: 'submitted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e1c0f44c668444188507b846b03ae323'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e1ded24e0c13465a91bcb5c29831b7e9'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'emergency_contact'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e23d6e963b5d499eb7d9dbf5f8d5115a'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'pending_reason'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e24e2ac3452845d0bd6f1f0f49a390ef'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'present_address'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e270738f2cf34275bdf3a2c3e7b743a0'
                        key: {
                            sys_security_acl: 'ed2f95951dde4c8583cd03c3dbf7ea34'
                            sys_user_role: {
                                id: '06885cb436e64ebf9ff30b788eaf746d'
                                key: {
                                    name: 'x_587205_bjit_erp.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e2c031a686a44a748d0edaa8237041a8'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e2d6052be71b484180f1bfe873567f31'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e340264a890c49ba84bcace380d0011f'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'office_location'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e4aba3e3ca894e7bbb09fa9bc24516fb'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'is_store'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e4e5b58d3e6e45c7979391f4e83a9ae6'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'employee_type'
                            value: 'contractor'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e561a8791d20415ba66f7169e42b9388'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'marital_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e5d559df087544de8e63219af22acb3d'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e65c5e1dc0a64c2f86201c92a23256ee'
                        key: {
                            sys_security_acl: '5b4ad871b81546b888752d2a36469423'
                            sys_user_role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e7acafb3cdc2476e838296defeef21f0'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'category'
                            value: 'accessory'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e874003217464150889b6fd41e4f079d'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e96d1e81117d48718ce1634f4b12ecff'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'branch'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e98765187846402e89846c62fd1eed9c'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'priority'
                            value: 'high'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e9d479ccc41544b6963d673df9ee899f'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'eb299b027dd545f8a3aeb224946ff584'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'channel_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ebb030d3ee00487391b604a76b2ae6c6'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ec120217020448cc80ee7bfbd6e74586'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'marital_status'
                            value: 'married'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eda5e247f99b4b708306aaebf6737aac'
                        key: {
                            name: 'x_587205_bjit_erp_channel'
                            element: 'members'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'edd176ff42ad48cb8ded53fa7fe1cd67'
                        key: {
                            application_file: 'd19ee4340eff46a1b61960872e566dfd'
                            source_artifact: '7a6e18c36da44f42845a1e335ea82b0c'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ef0dc77dddf44a6ea7c2f9cbf6f873ce'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'emergency_contact'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ef391810d92043299835a27b1fea4a26'
                        key: {
                            sys_security_acl: '27b5de4e097d4f4590b1514d414bc184'
                            sys_user_role: {
                                id: 'aa16fb7281d142458da438666d23922f'
                                key: {
                                    name: 'x_587205_bjit_erp.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f043ce83035249f4be44e5ed18679f95'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'is_store'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'f091ddc1c93d4b2da4b8148e455880a3'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'asset_type'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f0baf9dacd7242938a3a9d4511daee2f'
                        deleted: true
                        key: {
                            sys_security_acl: '27b5de4e097d4f4590b1514d414bc184'
                            sys_user_role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f1e3e74d68a04fc58bf76bcd1b471a08'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'state'
                            value: 'second_approved'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f22d4ae23a94410bb60563c24147b14f'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f2b70cc232414ae298c1fd4852ea279c'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'work_phone'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f35f52c453d3438886dfaaa7b42f74e0'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'serial'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f3a64493ce9d488a9aa851623308bddb'
                        key: {
                            name: 'x_587205_bjit_erp_asset_req'
                            element: 'state'
                            value: 'approved'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f5b51ccdd83b43058f079e985d037c14'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'state'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f6413a3eef624d8b9617b7b79ca6eaf9'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'category'
                            value: 'memory_storage'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f6b357f4324b4a8297eed8b332ae1618'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                            element: 'employment_status'
                            value: 'resigned'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f6f97213bf9549daaf9a19ee42ce5879'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'pending_reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f7ad1345e38d4e429767614867d1b671'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'asset_type'
                            value: 'components'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f85e4d6b704e435b961214d83dcefce1'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f8bb2b6b0edd4f9db0964fb3da1df192'
                        key: {
                            name: 'x_587205_bjit_erp_location'
                            element: 'branch'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f911c75a4a32402abaeef3069f06913a'
                        deleted: true
                        key: {
                            sys_security_acl: 'f56594252a8d44a9b1ba74ad942d25f2'
                            sys_user_role: {
                                id: 'bfd3e4cdc29a41d189b65fb7343d7d41'
                                key: {
                                    name: 'x_587205_bjit_erp.hr'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'f92d4eb4a05f4c1f87a40dc65ef99348'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fa246a1039be44b5b0aede24d4b1c13e'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'history_users'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fadfda843b0445e48041a325bf66ece4'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'serial'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fbafd48d92f84fd2b3e36cfd8e499498'
                        key: {
                            name: 'x_587205_bjit_erp_message'
                            element: 'starred_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fbf6b24a921a4f1e97ad9d6621eeb77b'
                        key: {
                            name: 'x_587205_bjit_erp_employee'
                            element: 'work_email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fc79a9de605548988cddd36af9de74bc'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'branch'
                            value: 'office_1'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fcd2e3d029034db08a0ea41bab91ee5f'
                        key: {
                            name: 'x_587205_bjit_erp_ticket'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'fe767d556fd6453397f8b482d26ef6db'
                        key: {
                            name: 'x_587205_bjit_erp_employee_private'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ff0e81d2e9c8486281f1d63ceaddaad9'
                        key: {
                            name: 'x_587205_bjit_erp_asset'
                            element: 'asset_type'
                        }
                    },
                ]
            }
        }
    }
}
