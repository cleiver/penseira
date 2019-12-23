<?php

namespace App\Factory;

use Symfony\Component\HttpFoundation\JsonResponse;

class ResponseFactory
{

  public function create(int $status, int $page, int $pages, int $itensPerPage, $data): JsonResponse
  {
    return new JsonResponse([
      'status' => $status,
      'pagination' => [
        'page' => $page,
        'pages' => $pages,
        'itensPerPage' => $itensPerPage,
      ],
      'data' => $data,
    ]);
  }
}
