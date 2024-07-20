import { Button } from '../ui/button';
import {
  ADD_AUDIO,
  ADD_IMAGE,
  ADD_TEXT,
  ADD_VIDEO,
  dispatcher,
} from '@designcombo/core';
import { nanoid } from 'nanoid';
import { IMAGES } from '@/data/images';
import { DEFAULT_FONT } from '@/data/fonts';
import { AUDIOS } from '@/data/audio';

export const Uploads = () => {
  const handleAddImage = () => {
    dispatcher?.dispatch(ADD_IMAGE, {
      payload: {
        id: nanoid(),
        details: {
          src: IMAGES[4].src,
        },
      },
      options: {},
    });
  };

  const handleAddText = () => {
    dispatcher?.dispatch(ADD_TEXT, {
      payload: {
        id: nanoid(),
        details: {
          text: 'Heading',
          fontSize: 64,
          fonturl: DEFAULT_FONT.url,
          fontFamily: DEFAULT_FONT.postScriptName,
          color: '#ffffff',
        },
      },
      options: {},
    });
  };

  const handleAddAudio = () => {
    // dispatcher?.dispatch(ADD_AUDIO, {
    //   payload: {
    //     id: nanoid(),
    //     details: {
    //       src: 'https://ik.imagekit.io/snapmotion/timer-voice.mp3',
    //     },
    //   },
    //   options: {},
    // });
  };

  const handleAddVideo = () => {
    dispatcher?.dispatch(ADD_VIDEO, {
      payload: {
        id: nanoid(),
        details: {
          src: 'https://ik.imagekit.io/snapmotion/75475-556034323_medium.mp4',
        },
        metadata: {
          resourceId: '7415538a-5d61-4a81-ad79-c00689b6cc10',
        },
      },
    });
  };

  const handleAddVideo2 = () => {
    dispatcher?.dispatch(ADD_VIDEO, {
      payload: {
        id: nanoid(),
        details: {
          src: 'https://ik.imagekit.io/snapmotion/flat.mp4',
        },
        metadata: {
          resourceId: '7415538a-5do1-4m81-a279-c00689b6cc10',
        },
      },
    });
  };
  return (
    <div>
      <div className="text-md text-[#e4e4e7] font-medium h-11 border-b  border-border flex items-center px-4 text-muted-foreground">
        Uploads
      </div>
      <div>
        <div className="flex flex-col gap-2 p-4">
          <Button
            size={'sm'}
            variant={'secondary'}
            className="w-full text-sm font-semibold"
            onClick={handleAddImage}
          >
            Add a new image
          </Button>
          <Button
            size={'sm'}
            variant={'secondary'}
            className="w-full text-sm font-semibold"
            onClick={handleAddVideo}
          >
            Add a new video
          </Button>

          <Button
            size={'sm'}
            variant={'secondary'}
            className="w-full text-sm font-semibold"
            onClick={handleAddVideo2}
          >
            Add a new video
          </Button>

          <Button
            onClick={handleAddAudio}
            size={'sm'}
            variant={'secondary'}
            className="w-full text-sm font-semibold"
          >
            Add a new audio
          </Button>
          <Button
            size={'sm'}
            variant={'secondary'}
            className="w-full text-sm font-semibold"
            onClick={handleAddText}
          >
            Add a new text
          </Button>
        </div>
      </div>
    </div>
  );
};
