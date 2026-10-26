import React from 'react';
import { useContent } from '../context/ContentContext';
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from 'react-icons/rx';
import { FaYoutube, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  const { siteInfo } = useContent();
  const currentYear = new Date().getFullYear();

  const footerData = [
    {
      title: 'Community',
      data: [
        {
          name: 'YouTube',
          icon: FaYoutube,
          link: 'https://youtube.com',
        },
        {
          name: 'GitHub',
          icon: RxGithubLogo,
          link: 'https://github.com/mhussain-codes',
        },
        {
          name: 'Discord',
          icon: RxDiscordLogo,
          link: 'https://discord.com',
        },
      ],
    },
    {
      title: 'Social Media',
      data: [
        {
          name: 'Instagram',
          icon: RxInstagramLogo,
          link: siteInfo?.contact?.instagram || 'https://www.instagram.com/hussainxwebsolutions?cplk=MWs1MGpkaTh5MTllMA==',
        },
        {
          name: 'Twitter (X)',
          icon: RxTwitterLogo,
          link: siteInfo?.contact?.twitter || 'https://x.com/hussainawann',
        },
        {
          name: 'Facebook',
          icon: FaFacebook,
          link: siteInfo?.contact?.facebook || 'https://www.facebook.com/share/19fZxJZbJv/',
        },
        {
          name: 'Linkedin',
          icon: RxLinkedinLogo,
          link: siteInfo?.contact?.linkedin || 'https://www.linkedin.com/in/hussain-awan-b64314282/',
        },
      ],
    },
    {
      title: 'About',
      data: [
        {
          name: 'Become Sponsor',
          icon: null,
          link: '#projects',
        },
        {
          name: 'Learning about me',
          icon: null,
          link: '/about',
        },
        {
          name: 'Contact Me',
          icon: null,
          link: `mailto:${siteInfo?.contact?.email || 'hussainxwebsolutions@gmail.com'}`,
        },
      ],
    },
  ];

  return (
    <footer className="w-full h-full bg-transparent text-gray-200 border-t border-white/5 py-12 px-6 z-[20] relative">
      <div className="w-full flex flex-col items-center justify-center m-auto max-w-7xl">
        <div className="w-full h-full flex flex-row items-start justify-around flex-wrap gap-10 mb-12">
          {footerData.map((column) => (
            <div
              key={column.title}
              className="min-w-[180px] h-auto flex flex-col items-center sm:items-start justify-start"
            >
              <h3 className="font-bold text-base text-white mb-4 tracking-wide border-b border-purple-500/30 pb-1 w-full text-center sm:text-left">
                {column.title}
              </h3>
              {column.data.map(({ icon: Icon, name, link }) => (
                <a
                  key={`${column.title}-${name}`}
                  href={link}
                  target={link.startsWith('http') || link.startsWith('mailto:') ? '_blank' : '_self'}
                  rel="noreferrer noopener"
                  className="flex flex-row items-center my-2 text-sm text-gray-400 hover:text-purple-300 transition-colors"
                >
                  {Icon && <Icon className="mr-2 h-4 w-4 text-purple-400" />}
                  <span>{name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="text-sm text-gray-400 text-center border-t border-white/5 pt-6 w-full">
          &copy; {siteInfo?.founder || 'M. Hussain'} {currentYear} Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
