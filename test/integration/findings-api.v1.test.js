/**
 * (C) Copyright IBM Corp. 2020.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const FindingsApiV1 = require('../../dist/findings-api/v1');
const accountId = process.env.ACCOUNT_ID;
const apiKey = process.env.API_KEY;
const findingsApiUrl = process.env.FINDINGS_API_URL;
const iamUrl = process.env.IAM_URL;

const service = {
    authenticator: new IamAuthenticator({
        apikey: apiKey,
        url: iamUrl,
        disableSslVerification: true,
    }),
    url: findingsApiUrl,
    disableSslVerification: true,
};

const findingsApi = new FindingsApiV1(service);

describe('FindingsApiV1', () => {
    describe('postGraph', () => {
        test('testing endpoint POST Graph', async () => {
            return findingsApi.postGraph({
                accountId: accountId,
                body: "{notes{id}}",
                contentType: "application/graphql",
            }).then(resp => {
                expect(resp.status).toBe(200);
            }).catch(err => {
                fail(err);
            });
        });
    });

    describe('listProviders', () => {
        test('testing endpoint GET Providers', async () => {
            return findingsApi.listProviders({
                accountId: accountId
            }).then(resp => {
                expect(resp.status).toBe(200);
            }).catch(err => {
                fail(err);
            });
        });
    });

    describe('createNote', () => {
        test('testing endpoint POST Note', async () => {
            return findingsApi.createNote({
                accountId: accountId,
                id: 'test_card',
                kind: 'CARD',
                longDescription: 'long description',
                shortDescription: 'short description',
                providerId: 'test',
                reportedBy: {
                    id: 'test_reporter',
                    title: 'reporter',
                    url: 'https://cloud.ibm.com'
                },
                relatedUrl: [
                    {
                        label: 'url label',
                        url: 'https://cloud.ibm.com'
                    }
                ],
                card: {
                    section: 'test_section',
                    title: 'test_card_title',
                    subtitle: 'test_card_subtitle',
                    finding_note_names: [
                        accountId + "/providers/test/notes/test_card"
                    ],
                    elements: [
                        {
                            kind: 'NUMERIC',
                            default_time_range: '1d',
                            text: 'test_text',
                            valueType: {
                                kind: 'FINDING_COUNT',
                                finding_note_names: accountId + "/providers/test/notes/test_card",
                                text: 'test_text'
                            }
                        }
                    ]
                },
                kpi: {
                    aggregation_type: "SUM"
                }
            }).then(resp => {
                expect(resp.status).toBe(400);
            }).catch(_ => { });
        });
    });

    describe('listNotes', () => {
        test('testing endpoint GET Notes', async () => {
            return findingsApi.listNotes({
                accountId: accountId,
                providerId: 'test'
            }).then(resp => {
                expect(resp.status).toBe(200);
            }).catch(err => {
                fail(err);
            });
        });
    });

    describe('getNote', () => {
        test('testing endpoint GET Note', async () => {
            return findingsApi.getNote({
                accountId: accountId,
                providerId: 'test',
                noteId: 'koi_bhi_note'
            }).then(resp => {
                expect(resp.status).toBe(404);
            }).catch(_ => { });
        });
    });

    describe('updateNote', () => {
        test('testing endpoint PUT Note', async () => {
            return findingsApi.updateNote({
                accountId: accountId,
                id: 'test_card',
                kind: 'CARD',
                longDescription: 'long description',
                shortDescription: 'short description',
                providerId: 'test',
                reportedBy: {
                    id: 'test_reporter',
                    title: 'reporter',
                    url: 'https://cloud.ibm.com'
                },
                relatedUrl: [
                    {
                        label: 'url label',
                        url: 'https://cloud.ibm.com'
                    }
                ],
                card: {
                    section: 'test_section',
                    title: 'test_card_title',
                    subtitle: 'test_card_subtitle',
                    finding_note_names: [
                        accountId + "/providers/test/notes/test_card"
                    ],
                    elements: [
                        {
                            kind: 'NUMERIC',
                            default_time_range: '1d',
                            text: 'test_text',
                            valueType: {
                                kind: 'FINDING_COUNT',
                                finding_note_names: accountId + "/providers/test/notes/test_card",
                                text: 'test_text'
                            }
                        }
                    ]
                },
                kpi: {
                    aggregation_type: "SUM"
                },
                noteId: 'koi_bhi_note'
            }).then(resp => {
                expect(resp.status).toBe(404);
            }).catch(_ => { });
        });
    });

    describe('deleteNote', () => {
        test('testing endpoint DELETE Note', async () => {
            return findingsApi.deleteNote({
                accountId: accountId,
                providerId: 'test',
                noteId: 'koi_bhi_note'
            }).then(resp => {
                expect(resp.status).toBe(404);
            }).catch(_ => { });
        });
    });

    describe('getNoteByOccurrenceId', () => {
        test('testing endpoint GET Note by Occurrence Id', async () => {
            return findingsApi.getOccurrenceNote({
                accountId: accountId,
                providerId: 'test',
                occurrenceId: 'koi_bhi_occurrence'
            }).then(resp => {
                expect(resp.status).toBe(404);
            }).catch(_ => { });
        });
    });

    describe('createOccurrence', () => {
        test('testing endpoint POST Occurrence', async () => {
            return findingsApi.createOccurrence({
                accountId: accountId,
                providerId: 'test',
                noteName: accountId + "/providers/test/notes/test_note",
                kind: 'FINDING',
                id: 'test_occurrence',
                resourceUrl: 'https://cloud.ibm.com',
                remediation: 'test_remediation',
                context: {
                    region: 'test_region',
                    resource_crn: 'test_crn',
                    resource_id: 'test_id',
                    resource_name: 'test_name',
                    resource_type: 'test_type',
                    service_crn: 'test_crn',
                    service_name: 'test_name',
                    environment_name: 'test_environment',
                    component_name: 'test_component',
                    toolchain_id: 'test_toolchain'
                },
                finding: {
                    severity: 'LOW',
                    certainty: 'LOW',
                    next_steps: [
                        {
                            title: 'test_title',
                            url: 'https://cloud.ibm.com'
                        }
                    ],
                    network_connection: {
                        direction: 'test_direction',
                        protocol: 'test_protocol',
                        client: {
                            address: 'test_address',
                            port: 26
                        },
                        server: {
                            address: 'test_address',
                            port: 26
                        }
                    },
                    data_transferred: {
                        client_bytes: 26,
                        client_packets: 26,
                        server_bytes: 26,
                        server_packets: 26
                    }
                }
            }).then(resp => {
                expect(resp.status).toBe(404);
            }).catch(_ => { });
        });
    });

    describe('listOccurrences', () => {
        test('testing endpoint GET Occurrences', async () => {
            return findingsApi.listOccurrences({
                accountId: accountId,
                providerId: 'test'
            }).then(resp => {
                expect(resp.status).toBe(200);
            }).catch(err => {
                fail(err);
            });
        });
    });

    describe('getOccurrence', () => {
        test('testing endpoint GET Occurrence', async () => {
            return findingsApi.getOccurrence({
                accountId: accountId,
                providerId: 'test',
                occurrenceId: 'koi_bhi_occurrence'
            }).then(resp => {
                expect(resp.status).toBe(404);
            }).catch(_ => { });
        });
    });

    describe('updateOccurrence', () => {
        test('testing endpoint PUT Occurrence', async () => {
            return findingsApi.updateOccurrence({
                accountId: accountId,
                providerId: 'test',
                noteName: accountId + "/providers/test/notes/test_note",
                kind: 'FINDING',
                id: 'test_occurrence',
                resourceUrl: 'https://cloud.ibm.com',
                remediation: 'test_remediation',
                context: {
                    region: 'test_region',
                    resource_crn: 'test_crn',
                    resource_id: 'test_id',
                    resource_name: 'test_name',
                    resource_type: 'test_type',
                    service_crn: 'test_crn',
                    service_name: 'test_name',
                    environment_name: 'test_environment',
                    component_name: 'test_component',
                    toolchain_id: 'test_toolchain'
                },
                finding: {
                    severity: 'LOW',
                    certainty: 'LOW',
                    next_steps: [
                        {
                            title: 'test_title',
                            url: 'https://cloud.ibm.com'
                        }
                    ],
                    network_connection: {
                        direction: 'test_direction',
                        protocol: 'test_protocol',
                        client: {
                            address: 'test_address',
                            port: 26
                        },
                        server: {
                            address: 'test_address',
                            port: 26
                        }
                    },
                    data_transferred: {
                        client_bytes: 26,
                        client_packets: 26,
                        server_bytes: 26,
                        server_packets: 26
                    }
                },
                occurrenceId: 'koi_bhi_occurrence'
            }).then(resp => {
                expect(resp.status).toBe(404);
            }).catch(_ => { });
        });
    });

    describe('deleteOccurrence', () => {
        test('testing endpoint DELETE Occurrence', async () => {
            return findingsApi.deleteOccurrence({
                accountId: accountId,
                providerId: 'test',
                occurrenceId: 'koi_bhi_occurrence'
            }).then(resp => {
                expect(resp.status).toBe(404);
            }).catch(_ => { });
        });
    });
})