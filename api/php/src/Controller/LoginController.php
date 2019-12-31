<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Firebase\JWT\JWT;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class LoginController extends AbstractController
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(
        UserRepository $userRepository,
        UserPasswordEncoderInterface $encoder
    ) {
        $this->userRepository = $userRepository;
        $this->encoder = $encoder;
    }
    /**
     * @Route("/login", name="login")
     */
    public function index(Request $request)
    {
        $body = json_decode($request->getContent());

        if (
            !isset($body->email)
            || is_null($body->email)
            || !isset($body->password)
            || is_null($body->password)
        ) {
            return new JsonResponse('You must suply your credentials', Response::HTTP_BAD_REQUEST);
        }

        $user = $this->userRepository->findOneBy([
            'email' => $body->email,
        ]);

        if (!$this->encoder->isPasswordValid($user, $body->password)) {
            return new JsonResponse(
                [
                    'error' => 'Invalid credentials'
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $token = JWT::encode(
            [
                'email' => $user->getEmail()
            ],
            '63b588cc6559c406f8a30ae836f271ea'
        );

        return new JsonResponse([
            'access_token' => $token
        ]);
    }
}
