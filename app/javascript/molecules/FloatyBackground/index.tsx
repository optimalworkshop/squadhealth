import React, {
  useCallback,
  useImperativeHandle,
  useState,
  createContext,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from 'react';
import { v4 as uuid } from 'uuid';
import sortBy from 'lodash/sortBy';
import * as ICONS from '../../atoms/Icon';
import { IconProps } from '../../atoms/Icon/Icon';

type IconName = keyof Omit<typeof ICONS, 'default' | 'Link' | 'Close'>;

interface Floater {
  id: string;
  Icon: React.FC<IconProps>;
  x: number;
  z: number;
}

export interface FloatyBackgroundHandles {
  add: (icon: IconName) => void;
}

export const FloatyBackgroundContext = createContext<FloatyBackgroundHandles>({
  add: (_icon: IconName) => null,
});

interface Props {
  children: ReactNode;
}

const MIN_Z = 0.5;

const FloatyBackground: ForwardRefRenderFunction<
  FloatyBackgroundHandles,
  Props
> = ({ children }, ref) => {
  const [floaters, setFloaters] = useState<Floater[]>([]);

  const add = useCallback(
    (name: IconName) =>
      setFloaters((current) =>
        sortBy(
          [
            ...current,
            {
              id: uuid(),
              Icon: ICONS[name],
              x: Math.random(),
              z: Math.random() * (1 - MIN_Z) + MIN_Z,
            },
          ],
          ['z']
        )
      ),
    []
  );

  const exited = useCallback((e) => {
    const { id } = e.target.dataset;
    setFloaters((current) => current.filter((f) => f.id !== id));
  }, []);

  useImperativeHandle(ref, () => ({ add }));

  return (
    <FloatyBackgroundContext.Provider value={{ add }}>
      <div className="floaty">
        <div className="floaty__icons">
          {floaters.map(({ Icon, id, x, z }) => (
            <span
              className="floaty__icon"
              key={id}
              data-id={id}
              style={{ animationDuration: `${3 / z}s` }}
              onAnimationEnd={exited}
            >
              <Icon
                style={{
                  transform: `translateX(${x * 100}vw) scale(${z})`,
                  opacity: z,
                }}
              />
            </span>
          ))}
        </div>
        <div className="floaty__children">{children}</div>
      </div>
    </FloatyBackgroundContext.Provider>
  );
};

const Component = forwardRef(FloatyBackground);

Component.displayName = 'FloatyBackground';

export default Component;
