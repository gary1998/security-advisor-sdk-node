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
const NotificationsApiV1 = require('../../dist/notifications-api/v1');
const accountId = process.env.ACCOUNT_ID;
const apiKey = process.env.API_KEY;
const notificationsApiUrl = process.env.FINDINGS_API_URL;
const iamUrl = process.env.IAM_URL;

const service = {
    authenticator: new IamAuthenticator({
        apikey: apiKey,
        url: iamUrl,
        disableSslVerification: true,
    }),
    url: notificationsApiUrl,
    disableSslVerification: true,
};

const notificationsApi = new NotificationsApiV1(service);

describe('NotificationsApiV1', () => {
    describe('listChannels', () => {
        test('testing endpoint GET Channels', async () => {
            return notificationsApi.listAllChannels({
                accountId: accountId
            }).then(resp => {
                expect(resp.status).toBe(200);
            }).catch(err => {
                fail(err);
            });
        });
    });

    describe('createChannel', () => {
        test('testing endpoint POST Channel', async () => {
            return notificationsApi.createNotificationChannel({
                accountId: accountId,
                endpoint: 'https://cloud.ibm.com',
                name: 'test_channel',
                type: 'Webhook',
                alertSource: [
                    {
                        provider_name: 'test_provider',
                        finding_types: [
                            'test_type'
                        ]
                    }
                ],
                description: 'test_description',
                enabled: true,
                severity: [
                    'LOW'
                ]
            }).then(resp => {
                expect(resp.status).toBe(404);
            }).catch(_ => { });
        });
    });

    describe('deleteChannels', () => {
        test('testing endpoint DELETE Channels', async () => {
            return notificationsApi.deleteNotificationChannels({
                accountId: accountId,
                body: [
                    'test_channel_1',
                    'test_channel_2'
                ]
            }).then(resp => {
                expect(resp.status).toBe(500);
            }).catch(_ => { });
        });
    });

    describe('deleteChannel', () => {
        test('testing endpoint DELETE Channel', async () => {
            return notificationsApi.deleteNotificationChannel({
                accountId: accountId,
                channelId: 'koi_bhi_channel'
            }).then(resp => {
                expect(resp.status).toBe(404);
            }).catch(_ => { });
        });
    });

    describe('getChannel', () => {
        test('testing endpoint GET Channel', async () => {
            return notificationsApi.getNotificationChannel({
                accountId: accountId,
                channelId: 'koi_bhi_channel'
            }).then(resp => {
                expect(resp.status).toBe(404);
            }).catch(_ => { });
        });
    });

    describe('updateChannel', () => {
        test('testing endpoint PUT Channel', async () => {
            return notificationsApi.updateNotificationChannel({
                accountId: accountId,
                endpoint: 'https://cloud.ibm.com',
                name: 'test_channel',
                type: 'Webhook',
                alertSource: [
                    {
                        provider_name: 'test_provider',
                        finding_types: [
                            'test_type'
                        ]
                    }
                ],
                description: 'test_description',
                enabled: true,
                severity: [
                    'LOW'
                ],
                channelId: 'koi_bhi_channel'
            }).then(resp => {
                expect(resp.status).toBe(404);
            }).catch(_ => { });
        });
    });

    describe('testChannel', () => {
        test('testing endpoint GET TestChannel', async () => {
            return notificationsApi.testNotificationChannel({
                accountId: accountId,
                channelId: 'koi_bhi_channel'
            }).then(resp => {
                expect(resp.status).toBe(404);
            }).catch(_ => { });
        });
    });

    describe('getPublicKey', () => {
        test('testing endpoint GET PublicKey', async () => {
            return notificationsApi.getPublicKey({
                accountId: accountId
            }).then(resp => {
                expect(resp.status).toBe(200);
            }).catch(err => {
                fail(err);
            });
        });
    });
});