import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import * as tradeEngine from '@/lib/tradeEngine';
import { AlphaButton } from '@/components/AlphaButton';

describe('AlphaButton', () => {
  it('calls executeAlphaTrade and alerts on success', async () => {
    const mockExecute = jest.spyOn(tradeEngine, 'executeAlphaTrade').mockResolvedValue({ success: true, token: 'AIFLOW', txHash: 'SIMULATED' } as any);
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { getByRole } = render(<AlphaButton strategy="quadfecta" sizeUsd={500000000} maxSlippage={0.3} />);
    fireEvent.click(getByRole('button'));

    // Allow async to flush
    await Promise.resolve();

    expect(mockExecute).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('AIFLOW'));
    
    mockExecute.mockRestore();
    alertSpy.mockRestore();
  });
});
