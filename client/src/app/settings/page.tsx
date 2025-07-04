'use client';

import React, { useState } from 'react';
import Header from '@/app/(components)/Header';

type UserSetting = {
  label: string;
  value: string | boolean;
  type: 'text' | 'toggle';
};

const mockSettings: UserSetting[] = [
  { label: 'User Name', value: 'Stratonik', type: 'text' },
  { label: 'Email', value: 'stratonik.dev@gmail.com', type: 'text' },
  { label: 'Notifications', value: true, type: 'toggle' },
  { label: 'DarkMode', value: false, type: 'toggle' },
  { label: 'Languages', value: 'English', type: 'text' },
];

const Settings = () => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  return (
    <div className="w-full">
      <Header name="User Settings" />
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="uppercase text-left py-3 px-4 font-semibold text-sm">
                Setting
              </th>

              <th className="uppercase text-left py-3 px-4 font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr key={setting.label} className="hover:bg-blue-50">
                <td className="px-4 py-2">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === 'toggle' ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
