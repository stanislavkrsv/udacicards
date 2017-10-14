import { Platform } from 'react-native'
export const IMAGE_RESIZE_MODE = (Platform.OS === 'ios' ? 'repeat' : 'cover')

export const backgroundImages = [
  require('./../assets/bg/1.png'),
  require('./../assets/bg/2.png'),
  require('./../assets/bg/3.png'),
  require('./../assets/bg/4.png'),
  require('./../assets/bg/5.png'),
  require('./../assets/bg/6.png'),
  require('./../assets/bg/8.png'),
  require('./../assets/bg/7.png'),
  require('./../assets/bg/9.png'),
  require('./../assets/bg/10.png'),
]

export function getBgImage(index) {
  return backgroundImages[index % 10]
}