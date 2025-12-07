// moodUtils.js
import imageMoodMain from '../assets/image-mood-main.png';
import normalImg from '../assets/normal.png';
import happyImg from '../assets/happy.png';
import calmImg from '../assets/calm.png';
import sadImg from '../assets/sad.png';
import anxiousImg from '../assets/anxious.png';

export const MOODS = [

    {
        id: 'happy',
        label: 'Vui vẻ',
        bgColor: '#ffe1e4a9',
        bgColorLight: '#FFF9F9',
        textColor: '#7C1D38',
        dotColor: '#F28D9E',
        image: happyImg,
    },
    {
        id: 'calm',
        label: 'Bình yên',
        bgColor: '#ebf8d7a1',
        bgColorLight: '#FBFEF6',
        textColor: '#48660E',
        dotColor: '#C4E096',
        image: calmImg,
    },
    {
        id: 'normal',
        label: 'Bình thường',
        bgColor: '#fff4c1ae',
        bgColorLight: '#FFFCF5',
        textColor: '#7C691D',
        dotColor: '#FFD43B',
        image: normalImg,
    },
    {
        id: 'sad',
        label: 'Buồn',
        bgColor: '#d1f1ffb2',
        bgColorLight: '#F4FEFF',
        textColor: '#42606A',
        dotColor: '#7ED0FF',
        image: sadImg,
    },
    {
        id: 'anxious',
        label: 'Lo lắng',
        bgColor: '#e5d9fdc2',
        bgColorLight: '#FBF9FF',
        textColor: '#4B367D',
        dotColor: '#B59EFF',
        image: anxiousImg,
    },
];

export { imageMoodMain };