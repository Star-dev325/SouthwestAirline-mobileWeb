// @flow
import React from 'react';
import HazmatIcon from 'src/shared/components/hazmatIcon';

const HazmatIconList = () => {
  const hazmatIcons = [
    [
      {
        iconClass: 'hazmat-icon--ic-ecig',
        iconTitle: 'E-Cigarettes/ Vaporizers'
      },
      {
        iconClass: 'hazmat-icon--ic-batteries',
        iconTitle: 'Lithium batteries'
      },
      {
        iconClass: 'hazmat-icon--ic-explosives',
        iconTitle: 'Explosives and fireworks'
      }
    ],
    [
      {
        iconClass: 'hazmat-icon--ic-gases',
        iconTitle: 'Compressed gases'
      },
      {
        iconClass: 'hazmat-icon--ic-flammable',
        iconTitle: 'Flammable liquids and solids'
      },
      {
        iconClass: 'hazmat-icon--ic-radioactive',
        iconTitle: 'Radioactive materials'
      }
    ],
    [
      {
        iconClass: 'hazmat-icon--ic-poison',
        iconTitle: 'Poisons'
      },
      {
        iconClass: 'hazmat-icon--ic-corrosives',
        iconTitle: 'Corrosives'
      },
      {
        iconClass: 'hazmat-icon--ic-oxidizers',
        iconTitle: 'Oxidizers'
      }
    ]
  ];

  return (
    <div className="hazmat-icon-list-grid">
      {hazmatIcons.map((iconRow, index) => (
        <div className="hazmat-icon-list-row" key={index}>
          {iconRow.map((iconObj, indexIconObj) => (
            <HazmatIcon iconObj={iconObj} key={indexIconObj} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default HazmatIconList;
