import { ReactNode } from 'react';
import SwiperSlider from '@/components/Globals/SwiperSlider';
import { Autoplay } from 'swiper/modules';

interface HeadingProps {
  level: string;
  className: string;
  children: ReactNode;
}

interface TableCellProps {
  type?: 'td' | 'th';
  className?: string;
  children?: ReactNode;
  colspan?: number;
}

const Heading = ({ level, className, children }: HeadingProps) => {
  const HeadingTag = level as keyof JSX.IntrinsicElements;
  return (
    <HeadingTag className={`${className} text-2xl font-bold my-4`}>
      {children}
    </HeadingTag>
  );
};

const Paragraph = ({ className, children }: { className: string, children: ReactNode }) => (
  <p className={`${className} my-4 leading-relaxed`}>
    {children}
  </p>
);

const TableCell = ({ type = 'td', className, children, colspan }: TableCellProps) => {
  const Tag = type as 'td' | 'th';

  return (
    <Tag
      className={`border border-gray-200 p-2 ${className} ${type === 'th' ? 'font-bold bg-gray-50' : ''}`}
      colSpan={colspan}
    >
      {Array.isArray(children)
        ? children.map((child, index) => {
          if (typeof child === 'string') return child;
          if (child?.type === 'strong') return child.props.children;
          if (child?.props?.children) return child.props.children;
          return child;
        })
        : children}
    </Tag>
  );
};

const BlockRenderer = ({ blocks }: { blocks: any }) => {
  const renderBlock = (block: any) => {
    switch (block.type) {
      case 'figure':
        if (block.props.className?.includes('wp-block-gallery')) {
          return (
            <SwiperSlider
              key={block.key} 
              images={block.props.children}
              options={
                { 
                  modules: { 
                    hasNavigation: true, 
                    hasPagination: true, 
                    hasAutoplay: true 
                  } 
                }
              } 
            />
          );
        }

        return (
          <figure key={block.key} className={block.props.className}>
            {block.props.children.map((child: any, index: number) => renderBlock({ ...child, key: index }))}
          </figure>
        );

      case 'img':
        return (
          <img
            key={block.key}
            src={block.props.src}
            alt={block.props.alt}
            className={`${block.props.className} w-full h-auto rounded-lg`}
            width={block.props.width}
            height={block.props.height}
            loading="lazy"
            srcSet={block.props.srcSet}
            sizes={block.props.sizes}
          />
        );

      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return (
          <Heading
            key={block.key}
            level={block.type}
            className={block.props.className}
          >
            {block.props.children}
          </Heading>
        );

      case 'p':
        return (
          <Paragraph key={block.key} className={block.props.className}>
            {block.props.children}
          </Paragraph>
        );

      case 'table':
        return (
          <table key={block.key} className="min-w-full border-collapse border border-gray-200">
            {block.props.children.map((child: object, index: number) => renderBlock({ ...child, key: index }))}
          </table>
        );

      case 'thead':
        return (
          <thead key={block.key} className="bg-gray-50">
            {block.props.children.map((child: object, index: number) => renderBlock({ ...child, key: index }))}
          </thead>
        );

      case 'tbody':
        return (
          <tbody key={block.key}>
            {block.props.children.map((child: object, index: number) => renderBlock({ ...child, key: index }))}
          </tbody>
        );

      case 'tr':
        return (
          <tr key={block.key}>
            {block.props.children.map((child: object, index: number) => renderBlock({ ...child, key: index }))}
          </tr>
        );

      case 'td':
      case 'th':
        return (
          <TableCell
            key={block.key}
            type={block.type}
            className={`${block.props.className} ${block.type === 'th' ? 'font-bold' : ''}`}
          >
            {block.props.children}
          </TableCell>
        );

      case 'strong':
        return block.props.children;

      default:
        if (block.props?.children) {
          if (Array.isArray(block.props.children)) {
            return block.props.children.map((child: object, index: number) =>
              typeof child === 'string'
                ? child
                : renderBlock({ ...child, key: `${block.key}-${index}` })
            );
          }
          return renderBlock(block.props.children);
        }
        return null;
    }
  };

  return (
    <div className="wp-blocks">
      {blocks.map((block: object) => renderBlock(block))}
    </div>
  );
};

export default BlockRenderer;