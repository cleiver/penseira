<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
  /**
   * @Route("/login", name="app_login")
   */
  public function login(AuthenticationUtils $authenticationUtils): Response
  {
    // Get the login error if there is one
    $error = $authenticationUtils->getLastAuthenticationError();

    // Retrive the last email entered by the user
    $email = $authenticationUtils->getLastUsername();

    return $this->render('security/login.html.twig', [
      'email' => $email,
      'error' => $error
    ]);
  }

  /**
   * @Route("/", name="app_index")
   */
  public function index(): Response
  {
    return $this->redirectToRoute('link_index');
  }
}
