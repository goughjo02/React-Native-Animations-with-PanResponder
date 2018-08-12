import 'react-native';
import MockAsyncStorage from 'mock-async-storage'
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const mock = () => {
  const mockImpl = new MockAsyncStorage()
  jest.mock('AsyncStorage', () => mockImpl)
}

mock();

import { AsyncStorage as storage } from 'react-native'


it('Mock Async Storage working', async () => {
  await storage.setItem('myKey', 'myValue')
  const value = await storage.getItem('myKey')
  expect(value).toBe('myValue')
})