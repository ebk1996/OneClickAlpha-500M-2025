import React from 'react';
import { render, screen } from '@testing-library/react';
import * as quadfecta from '@/lib/quadfectaEngine';
import { QuadfectaPanel } from '@/components/QuadfectaPanel';

describe('QuadfectaPanel', () => {
  it('renders static UI elements', () => {
    const mockSignal = jest.spyOn(quadfecta, 'getQuadfectaSignal').mockResolvedValue(null as any);
    render(<QuadfectaPanel />);
    expect(screen.getByText('Quadfecta™ Live')).toBeTruthy();
    expect(screen.getByText('Whale: 96%')).toBeTruthy();
    expect(screen.queryByText(/AUTO-\$500M/)).toBeNull();
    
    mockSignal.mockRestore();
  });
});
