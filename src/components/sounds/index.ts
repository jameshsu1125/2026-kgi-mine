import { Howl } from 'howler';
import { SoundName } from './type';
import { MP3List } from './config';
import { mergePath } from '@/utils';

type SoundTrackProps = {
  onload?: (type: PreloadType) => void;
  onError?: (message: string) => void;
};

export type PreloadType =
  | 'onStart'
  | 'onAzureCoast'
  | 'onFlowerSeaPlain'
  | 'onGoldenRiceField'
  | 'onLushForest'
  | 'onMoonlitSnowfield';

export default class Sounds {
  public track: Record<
    SoundName,
    { src: string[]; loop: boolean; onload: boolean; track: Howl | null; preloadType: PreloadType }
  > = {
    bgm: {
      src: [mergePath(MP3List.bgm)],
      loop: true,
      onload: false,
      track: null,
      preloadType: 'onStart',
    },
    click: {
      src: [mergePath(MP3List.click)],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onStart',
    },
    correct: {
      src: [mergePath(MP3List.correct)],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onStart',
    },
    wrong: {
      src: [mergePath(MP3List.wrong)],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onStart',
    },
    levelUp: {
      src: [mergePath(MP3List.levelUp)],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onStart',
    },
    azureCoast: {
      src: [mergePath(MP3List.azureCoast)],
      loop: true,
      onload: false,
      track: null,
      preloadType: 'onAzureCoast',
    },
    flowerSeaPlain: {
      src: [mergePath(MP3List.flowerSeaPlain)],
      loop: true,
      onload: false,
      track: null,
      preloadType: 'onFlowerSeaPlain',
    },
    goldenRiceField: {
      src: [mergePath(MP3List.goldenRiceField)],
      loop: true,
      onload: false,
      track: null,
      preloadType: 'onGoldenRiceField',
    },
    lushForest: {
      src: [mergePath(MP3List.lushForest)],
      loop: true,
      onload: false,
      track: null,
      preloadType: 'onLushForest',
    },
    moonlitSnowfield: {
      src: [mergePath(MP3List.moonlitSnowfield)],
      loop: true,
      onload: false,
      track: null,
      preloadType: 'onMoonlitSnowfield',
    },
  };

  private onload: (type: PreloadType) => void;
  private onError: (message: string) => void;

  constructor(props: SoundTrackProps) {
    this.onload = props.onload || (() => {});
    this.onError = props.onError || (() => {});

    this.preload('onStart');
  }

  private recreateTrack(name: SoundName): void {
    const trackInfo = this.track[name];
    if (!trackInfo) return;

    // 停止並清理舊的音軌
    if (trackInfo.track) {
      try {
        trackInfo.track.stop();
        trackInfo.track.unload();
      } catch {
        this.onError(`清理音軌 ${name} 失敗`);
      }
    }

    // 創建新的音軌
    trackInfo.track = new Howl({
      src: trackInfo.src,
      loop: trackInfo.loop,
      // html5: false, // 在移動設備上，Web Audio API 通常更穩定
      preload: true,
      onload: () => {
        trackInfo.onload = true;
        // console.log(`音軌 ${name} 重新載入完成`);
      },
      onloaderror: () => {
        this.onError(`音軌 ${name} 重新載入失敗`);
      },
    });
  }

  preload(type: PreloadType, onload?: (type: PreloadType) => void) {
    this.onload = onload || this.onload;

    const isLoadedBefore = Object.values(this.track)
      .filter((value) => value.preloadType === type)
      .every((value) => value.onload);

    if (isLoadedBefore) {
      this.checkIsLoaded(type);
      return;
    }

    Object.entries(this.track)
      .filter((track) => track[1].preloadType === type)
      .forEach(([key, value]) => {
        this.track[key as SoundName].track = new Howl({
          src: value.src,
          loop: value.loop,
          onload: () => {
            value.onload = true;
            this.checkIsLoaded(type);
          },
        });
      });
  }

  checkIsLoaded(type: PreloadType) {
    const isOnStartLoaded = Object.values(this.track)
      .filter((value) => value.preloadType === type)
      .every((value) => value.onload);
    if (isOnStartLoaded) {
      this.onload(type);
    }
  }

  preloadByName(name: string[], preload: PreloadType, onload?: (type: PreloadType) => void) {
    this.onload = onload || this.onload;
    name.forEach((n) => {
      const soundName = n as SoundName;
      if (this.track[soundName] && !this.track[soundName].onload) {
        this.track[soundName].track = new Howl({
          src: this.track[soundName].src,
          loop: this.track[soundName].loop,
          html5: true,
          onload: () => {
            this.track[soundName].onload = true;
            if (onload) onload(preload);
          },
          onloaderror: () => {
            this.onError(`音軌 ${n} 重新載入失敗`);
          },
        });
      }
    });
  }

  play(name: SoundName, volume = 1, canPlayTwice = true) {
    const trackInfo = this.track[name];

    if (!trackInfo || !trackInfo.onload || !trackInfo.track) {
      this.onError(`音頻 ${name} 尚未載入或不存在`);
      return;
    }

    const track = trackInfo.track;

    if (!canPlayTwice && track.playing()) {
      this.onError(`該語音已在播放中，無法重複播放`);
      return;
    }

    try {
      // 設定音量並播放
      track.volume(volume);
      track.play();
    } catch {
      this.onError(`播放 ${name} 失敗，嘗試重新創建`);
      // 如果播放失敗，嘗試重新創建音軌
      this.recreateTrack(name as SoundName);

      // 重新嘗試播放
      setTimeout(() => {
        if (this.track[name].track) {
          try {
            this.track[name].track!.volume(volume);
            this.track[name].track!.play();
          } catch (retryError) {
            this.onError(`重試播放 ${name} 也失敗: ${retryError}`);
          }
        }
      }, 100);
    }
  }

  stop(name: SoundName) {
    // alert(`${this.track[name]}, ${this.track[name]?.track}, ${this.track[name].onload}`);
    if (this.track[name] && this.track[name].onload && this.track[name].track) {
      this.track[name].track!.stop();
    }
  }

  stopAll() {
    Object.values(this.track).forEach((trackInfo) => {
      if (trackInfo.onload && trackInfo.track) {
        trackInfo.track.stop();
      }
    });
  }

  fadeOut(name: SoundName, duration = 1000) {
    if (this.track[name] && this.track[name].onload && this.track[name].track) {
      const track = this.track[name].track!;
      const currentVolume = track.volume();
      track.fade(currentVolume, 0, duration);
      setTimeout(() => {
        track.stop();
        track.volume(currentVolume); // 恢復原始音量以便下次播放
      }, duration);
    }
  }

  // 檢查音頻狀態的方法
  public checkAudioStatus(): { available: boolean; context: string } {
    const sampleTrack = Object.values(this.track).find((track) => track.track);
    if (!sampleTrack || !sampleTrack.track) {
      return { available: false, context: 'no_tracks' };
    }

    const ctx = (sampleTrack.track as any)._context;
    return {
      available: !document.hidden && ctx?.state !== 'suspended',
      context: ctx?.state || 'unknown',
    };
  }
}
