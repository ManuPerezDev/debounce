async function initMocks() {
  const { worker } = await import('./browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
  console.log('Mocks server started');
}

initMocks().then(() => console.log('Mocks initialized'));

export {};
