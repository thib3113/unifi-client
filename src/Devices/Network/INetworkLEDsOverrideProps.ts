import { hexColor } from '../../commons';

export interface INetworkLEDsOverrideProps {
    /*
     * - "off" disables the LED of the device,
     * - "on" enables the LED of the device,
     * - "default" applies the site-wide setting for device LEDs
     */
    mode?: 'on' | 'off' | 'default';
    /*
     * the hex color for the led
     */
    color?: hexColor;
    /*
     * positive number, the brightness of the led
     */
    brightness?: number;
}
