'use client';
import { characterStateSelector } from '@/redux/character/selector';
import { characterFetch } from '@/redux/character/thunk';
import { AppDispatch } from '@/store';
import {
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  Node,
  Edge,
} from '@xyflow/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import errorGif from '../../../../public/img/error.gif';
import loadingGif from '../../../../public/img/loading.gif';
import Image from 'next/image';
import Link from 'next/link';

const Character = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const dispatch: AppDispatch = useDispatch();

  const { data, loading, error } = useSelector(characterStateSelector);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (id) {
      dispatch(characterFetch(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (data) {
      const characterNode: Node = {
        id: 'character',

        data: {
          label: data.character.name,
        },
        position: { x: 300, y: 0 },
        style: {
          backgroundColor: 'rgb(94 136 152 / 0.9)',
          border: '1px solid #5e8898',
          color: '#fff',
          padding: '10px',
          width: '200px',
          height: '40px',
        },
      };
      // Space between nodes
      const horizontalSpacing = 200;
      const verticalSpacing = 100;

      // Create films nodes and edges
      const filmNodes: Node[] = data.films.map((film, index) => ({
        id: `film-${index}`,
        type: 'default',
        data: { label: film.title },
        position: { x: 100 + index * horizontalSpacing, y: 150 },
        style: {
          backgroundColor: '#685374',
          border: '1px solid #503b5c',
          color: '#fff',
          padding: '10px',
          width: '150px',
          borderRadius: '10px',
          minHeight: '50px',
          height: 'fit-content',
        },
      }));
      const filmEdges: Edge[] = data.films.map((_, index) => ({
        id: `edge-character-film-${index}`,
        source: 'character',
        target: `film-${index}`,
        type: 'smoothstep',
        style: { stroke: '#db8b56', color: '#db8b56' },
        animated: true,
      }));

      // Create starship nodes and edges
      const characterStarshipIds = new Set(data.character.starships);
      const starshipNodesMap = new Map(); // Avoid duplicate starship nodes
      const starshipEdges: Edge[] = [];

      data.films.forEach((film, filmIndex) => {
        film.starships.forEach((starshipId, starshipIndex) => {
          // Find starship details from data.starships
          if (characterStarshipIds.has(starshipId)) {
            const starshipDetail = data.starships.find(
              (starship) => starship.id === starshipId
            );

            if (starshipDetail && !starshipNodesMap.has(starshipId)) {
              const starshipNode: Node = {
                id: `starship-${starshipId}`,
                type: 'default',
                data: { label: starshipDetail.name },
                position: {
                  x: 0 + filmIndex * horizontalSpacing,
                  y: 200 + verticalSpacing * starshipIndex * 0.5,
                },
                style: {
                  backgroundColor: '#b63d42',
                  border: '1px solid #7d292c',
                  color: '#fff',
                  padding: '10px',
                  width: '150px',
                  borderRadius: '10px',
                  minHeight: '50px',
                  height: 'fit-content',
                },
              };
              starshipNodesMap.set(starshipId, starshipNode);
            }

            starshipEdges.push({
              id: `edge-film-${filmIndex}-starship-${starshipId}`,
              source: `film-${filmIndex}`,
              target: `starship-${starshipId}`,
              animated: true,
              type: 'smoothstep',
              style: { stroke: '#db8b56', color: '#db8b56' },
            });
          }
        });
      });

      const starshipNodes = Array.from(starshipNodesMap.values());

      //Set nodes and edges
      setNodes([characterNode, ...filmNodes, ...starshipNodes]);
      setEdges([...filmEdges, ...starshipEdges]);
    }
  }, [data]);

  return (
    <div className="h-[80vh] w-[1400px]">
      <div className="px-10 flex items-center content-center">
        <Link
          className="text-blue-300 hover:text-blue-700 flex items-center content-center gap-2 [&>svg]:stroke-blue-300 [&>svg]:hover:stroke-blue-700"
          href="/"
        >
          <svg
            height="16"
            viewBox="0 0 512 512"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-1.5"
          >
            <polyline
              points="244 400 100 256 244 112"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="48"
            />
            <line
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="48"
              x1="120"
              x2="412"
              y1="256"
              y2="256"
            />
          </svg>
          Back
        </Link>
      </div>
      {loading && (
        <div className="flex flex-col items-center my-5">
          <Image
            priority
            src={loadingGif}
            alt="loading-gif"
            width={200}
            height={200}
          />
        </div>
      )}
      {!loading && !error && (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Controls />
        </ReactFlow>
      )}
      {error && (
        <div className="flex flex-col items-center gap-3 my-5">
          <Image priority src={errorGif} alt="error-gif" />
          <p className="text-orange-500 text-xl">Something went wrong...</p>
          <p className="text-orange-500 text-xl">
            Return to{' '}
            <Link
              className="text-blue-300 hover:text-blue-700  underline"
              href="/"
            >
              main
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Character;
