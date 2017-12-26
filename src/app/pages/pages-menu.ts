import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-lightbulb',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Avis',
    icon: 'nb-compose',
    link: '/pages/avis',
  },
  {
    title: 'Liens',
    icon: 'nb-shuffle',
    link: '/pages/lien',
    children: [
      {
        title: 'Google Analytics',
        link: '/pages/lien/ganalytics',
      },
      {
         title: 'Facebook Analytics',
         link: '/pages/lien/fanalytics',
      },
      {
         title: 'Google Docs',
         link: '/pages/lien/gdocs',
      }
    ],
 },
 {
    title: 'Utilisateurs et Dates',
    icon: 'nb-location',
    link: '/pages/usersdate',
    children: [
      {
        title: 'Créer Evenement',
        link: '/pages/usersdate/createevent',
      },
      {
        title: 'Concerts',
        link: '/pages/usersdate/concerts',
      },
      {
        title: 'Artiste',
        link: '/pages/usersdate/artiste',
      }
    ],
 },
 {
    title: 'Technique',
    icon: 'nb-gear',
    link: '/pages/technique',
    children: [
      {
        title: 'Monitoring',
        link: '/pages/technique/monitoring',
      },
      {
        title: 'API',
        link: '/pages/technique/api',
      }
    ],
 },
 {
    title: 'Marketing',
    icon: 'nb-bar-chart',
    link: '/pages/marketing',
    children: [
      {
        title: 'Google Data Studio',
        link: '/pages/marketing/gdstudio',
      }
    ],
 },
];
