import { describe, it, expect, vi } from 'vitest'
import { Device, DeviceInfo } from '@capacitor/device'

// Mock the Device plugin
vi.mock('@capacitor/device', () => ({
  Device: {
    getInfo: vi.fn()
  }
}))

describe('Device Info Test', () => {
  it('should call Device.getInfo() and return device information', async () => {
    const mockDeviceInfo: DeviceInfo = {
      model: 'iPhone 14 Pro',
      platform: 'ios',
      operatingSystem: 'ios',
      osVersion: '17.0',
      manufacturer: 'Apple',
      isVirtual: false,
      memUsed: 4096000000,
      diskFree: 128000000000,
      diskTotal: 256000000000,
      realDiskFree: 128000000000,
      realDiskTotal: 256000000000,
      webViewVersion: '17.0'
    }

    // Mock the getInfo method
    vi.mocked(Device.getInfo).mockResolvedValue(mockDeviceInfo)

    // Call the method
    const result = await Device.getInfo()

    // Verify the result
    expect(Device.getInfo).toHaveBeenCalledOnce()
    expect(result).toEqual(mockDeviceInfo)
    expect(result.model).toBe('iPhone 14 Pro')
    expect(result.platform).toBe('ios')
    expect(result.isVirtual).toBe(false)
  })

  it('should handle errors when Device.getInfo() fails', async () => {
    const errorMessage = 'Device info not available'
    
    // Mock the getInfo method to throw an error
    vi.mocked(Device.getInfo).mockRejectedValue(new Error(errorMessage))

    // Verify the error is thrown
    await expect(Device.getInfo()).rejects.toThrow(errorMessage)
  })
}) 
