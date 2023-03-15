import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { LocationInput } from '@/types';
import React from 'react';
import { useTranslation } from 'next-i18next';
import Loader from '@/components/ui/loader/loader';

const libraries: any = ['places'];

export default function GooglePlacesAutocomplete({
  onChange,
  data,
  disabled = false
}: {
  onChange: any;
  data: LocationInput;
  disabled?: boolean
}) {
  const { t } = useTranslation();
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google_map_autocomplete',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries,
  });

  const [autocomplete, setAutocomplete] = React.useState<any>(null);

  const onLoad = React.useCallback(function callback(autocompleteInstance) {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setAutocomplete(null);
  }, []);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      return;
    }
    const location: any = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      formattedAddress: place.formatted_address,
    };

    for (const component of place.address_components) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0];

      switch (componentType) {
        case 'postal_code': {
          location['zip'] = component.long_name;
          break;
        }

        case 'postal_code_suffix': {
          location['zip'] = `${location?.zip}-${component.long_name}`;
          break;
        }

        case 'locality':
          location['city'] = component.long_name;
          break;

        case 'administrative_area_level_1': {
          location['state'] = component.short_name;
          break;
        }

        case 'country':
          location['country'] = component.long_name;
          break;
      }
    }
    if (onChange) {
      onChange(location);
    }
  };
  if (loadError) {
    return <div>{t('common:text-map-cant-load')}</div>;
  }
  return isLoaded ? (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      onUnmount={onUnmount}
      fields={['address_components', 'geometry.location', 'formatted_address']}
      types={['address']}
    >
      <input
        type="text"
        placeholder={t('form:placeholder-search-location')}
        defaultValue={data?.formattedAddress!}
        className={`flex h-12 w-full appearance-none items-center rounded border border-border-base px-4 text-sm text-heading transition duration-300 ease-in-out focus:border-accent focus:outline-none focus:ring-0 ${disabled ? 'cursor-not-allowed bg-[#EEF1F4] border-[#D4D8DD]' : ''}`}
        disabled={disabled}
      />
    </Autocomplete>
  ) : (
    <Loader simple={true} className="h-6 w-6" />
  );
}
