import { render } from '@testing-library/react';

import GraphqlClient from './graphql-client';

describe('GraphqlClient', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GraphqlClient />);
    expect(baseElement).toBeTruthy();
  });
});
