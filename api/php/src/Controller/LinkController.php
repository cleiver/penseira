<?php

namespace App\Controller;

use App\Factory\LinkFactory;
use App\Factory\ResponseFactory;
use App\Repository\LinkRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

class LinkController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var LinkRepository
     */
    private $linkRepository;

    /**
     * @var LinkFactory
     */
    private $linkFactory;

    /**
     * @var ResponseFactory
     */
    private $responseFactory;

    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(
        EntityManagerInterface $entityManager,
        LinkRepository $linkRepository,
        LinkFactory $linkFactory,
        ResponseFactory $responseFactory,
        LoggerInterface $logger
    ) {
        $this->entityManager = $entityManager;
        $this->linkRepository = $linkRepository;
        $this->linkFactory = $linkFactory;
        $this->responseFactory = $responseFactory;
        $this->logger = $logger;
    }

    /**
     * @Route("/links", methods={"POST"}, name="links-create")
     * 
     * @todo improve log with user info
     */
    public function create(Request $request): Response
    {
        $link = $this->linkFactory->fromJson($request->getContent());

        $this->entityManager->persist($link);
        $this->entityManager->flush();

        $this->logger->notice('A new link to {url} was created with id {id}', [
            'id' => $link->getId(),
            'url' => $link->getUrl(),
        ]);

        return new JsonResponse($link, Response::HTTP_CREATED);
    }

    /**
     * @Route("/links", methods={"GET"}, name="links-retrieve-all")
     */
    public function retrieveAll(): Response
    {
        $links = $this->linkRepository->findAll();

        $response = $this->responseFactory->create(200, 1, 1, 0, $links);

        return $response;
    }

    /**
     * @Route("/links/{id}", methods={"GET"}, name="links-retrieve-one")
     */
    public function retrieveOne(int $id): Response
    {
        $link = $this->linkRepository->find($id);

        $http_status = is_null($link) ? Response::HTTP_NO_CONTENT : Response::HTTP_OK;
        // No content because the query was successful, but there was no record with that id

        return new JsonResponse($link, $http_status);
    }

    /**
     * @Route("/links/{id}", methods={"PUT"}, name="links-update")
     * 
     * @todo improve log with user info
     */
    public function update(int $id, Request $request): Response
    {
        $updatedLink = $this->linkFactory->fromJson($request->getContent());

        $link = $this->linkRepository->find($id);

        if (is_null(($link))) {
            return new Response(null, Response::HTTP_NOT_FOUND);
            // Not found because, in theory, we know the id prior to update
        }

        $link
            ->setName($updatedLink->getName())
            ->setUrl($updatedLink->getUrl())
            ->setDescription($updatedLink->getDescription());

        $this->entityManager->flush();

        $this->logger->notice('The link with id {id} to {url} was updated', [
            'id' => $link->getId(),
            'url' => $link->getUrl(),
        ]);

        return new JsonResponse($link);
    }

    /**
     * @Route("/links/{id}", methods={"DELETE"}, name="links-delete")
     * 
     * @todo improve log with user info
     */
    public function delete(int $id): Response
    {
        $link = $this->linkRepository->find($id);
        $this->entityManager->remove($link);
        $this->entityManager->flush();

        $this->logger->notice('The link with {id} to {url} was deleted', [
            'id' => $link->getId(),
            'url' => $link->getUrl(),
        ]);

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}
