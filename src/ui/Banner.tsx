import React from 'react';
import { View, ScrollView, NativeScrollEvent, NativeSyntheticEvent, Dimensions } from 'react-native';
import Image from './Image';

interface BannerProps {
  images: string[];
  height?: number;
  autoPlay?: boolean;
  interval?: number;
}

export default function Banner({ images, height = 160, autoPlay = true, interval = 3000 }: BannerProps) {
  const [index, setIndex] = React.useState(0);
  const scrollRef = React.useRef<ScrollView>(null);
  const width = Dimensions.get('window').width;

  React.useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const timer = setInterval(() => {
      const next = (index + 1) % images.length;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setIndex(next);
    }, interval);
    return () => clearInterval(timer);
  }, [index, images.length, autoPlay, interval, width]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    if (next !== index) setIndex(next);
  };

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {images.map((src, i) => (
          <Image key={i} source={{ uri: src }} style={{ width, height }} className="bg-gray-100" resizeMode="cover" />
        ))}
      </ScrollView>
      <View className="absolute bottom-2 left-0 right-0 flex-row justify-center">
        {images.map((_, i) => (
          <View key={i} className={`w-2 h-2 rounded-full mx-1 ${i === index ? 'bg-white' : 'bg-white/50'}`} />
        ))}
      </View>
    </View>
  );
}

