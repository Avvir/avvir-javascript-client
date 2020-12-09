import ImageFetcher from "../javascript/services/utilities/image_fetcher";
import AvvirConsoleTools from "../javascript/services/utilities/avvir_console_tools";
import { Potree as PotreeType } from "@pnext/three-loader";
import * as ThreeType from "three";

declare module "react-firebase-file-uploader";
declare module "raf-stub";

declare module "random-strings" {
  /**
   * @param length The number of characters you want your String to be.
   * @return A String of <code>length</code> random characters from the {@link newBase64} character set.
   */
  function random(length: number): string;
  /**
   * @param length The number of characters you want your String to be.
   * @param alphabet The alphabet to use. Your resulting string will contain only characters from this alphabet. Default: {@link newBase64} character set
   * @return A String of <code>length</code> random characters from alphabet.
   */
  export function random(length: number, alphabet: string): string

  /**
   * @param length Integer. The number of characters you want your String to be.
   * @return A String of <code>length</code> random characters from the set <pre><code>abcdefghijklmnopqrstuvwxyz0123456789</code></pre>
   * */
  export function alphaNumLower(length: number): string

  /**
   * @param length Integer. The number of characters you want your String to be.
   * @return A String of <code>length</code> random characters from the set <pre><code>0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz-+*$</code></pre>
   */
  export function newBase64(length: number): string
}

declare global {
  interface Window {
    Avvir: {
      imageFetcher: ImageFetcher
    }
    AvvirConsoleTools: AvvirConsoleTools
  }
}

declare global {
  namespace Autodesk {
    namespace Viewing {
      class Model {
        getFragmentList(): Private.FragmentList
      }

      namespace Private {
        class FragmentList {
          is2d: boolean;
          modelId;
          fragments;
          geoms;
          isFixedSize: boolean;
          boxes: Float32Array;
          transforms: Float32Array;
          useThreeMesh: boolean;
          vizflags: Uint16Array;
          materialmap: { [materialId: number]: THREE.ShaderMaterial };
          nextMaterialId: number;
          themingOrGhostingNeedsUpdate: [];
          setMaterial: (fragId: number, material: THREE.Material) => void;
        }
      }
    }
  }
}

declare global {
  const Potree: PotreeType
}

declare global {
  const THREE: ThreeType
}
