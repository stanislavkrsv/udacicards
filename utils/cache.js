import React from 'react'
import { Font, Asset } from 'expo'
import { backgroundImages } from './bgImages'

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

export async function cacheResourcesAsync() {
  const imageAssets = cacheImages(backgroundImages)
  const fontAssets = Font.loadAsync({
    'common-font-bold': require('./../assets/fonts/font.otf'),
  })
  await Promise.all([ fontAssets, imageAssets,])
}