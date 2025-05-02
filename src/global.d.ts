// src/types/kakao.d.ts

export {};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }

  namespace kakao {
    namespace maps {
      class LatLng {
        constructor(lat: number, lng: number);
      }

      class Map {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(container: HTMLElement, options: any);
        setCenter(latlng: LatLng): void;
      }

      class Marker {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(options: any);
      }

      namespace services {
        class Places {
          keywordSearch(
            keyword: string,
            callback: (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              result: any[], // 이 부분을 더 정교하게 타입화 가능
              status: string,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              pagination: any
            ) => void
          ): void;
        }

        enum Status {
          OK = "OK",
          ERROR = "ERROR",
        }
      }
    }
  }
}
