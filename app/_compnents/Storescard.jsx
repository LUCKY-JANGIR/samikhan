import Image from '@/models/node_modules/next/image';
import Link from '@/models/node_modules/next/link'; // To link to the dynamic store page

export default function Storecards(props) {
  return (
        <Link key={props.id} href={`/stores/${props.category}`}>
          <div className="w-[20vw] h-[50vh] border-2 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            {/* Store Image */}
            <div className="w-full h-[60%] relative overflow-hidden mb-4">
              <Image
                src={props.image}
                alt={props.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>

            {/* Store Details */}
            <h2 className="text-2xl font-bold ">{props.name}</h2>
            <p className="text-sm mt-2">{props.description}</p>
          </div>
        </Link>
    
  );
}
